import React, { useCallback, useEffect, useMemo, useState } from 'react';

import flattenRtdb from '~/utilities/flatten-rtdb';
import localforage from '~/localforage';
import produce from 'immer';
import schema from '~/schema';
import useCurrentUser from '~/hooks/use-current-user';
import useValue from '~/hooks/use-value';

const DEFAULT_WORKSPACES = Object.assign([], { __isLoading: true });
export const DEFAULT_WORKSPACE = {
  __id: 'default',
  name: 'Default Workspace',
  guidelines: { x: [], y: [] },
  updated: 0,
};

export const UserWorkspacesContext = React.createContext();
export const WorkspaceContext = React.createContext();

export default function UserWorkspacesProvider({ children }) {
  const [workspaces, setWorkspaces] = useState(DEFAULT_WORKSPACES);
  const [workspace, setWorkspace] = useState(DEFAULT_WORKSPACE);
  const currentUser = useCurrentUser();
  const workspacesRef = useMemo(() => currentUser && schema.getUserWorkspacesRef(currentUser.uid), [
    currentUser,
  ]);
  const selectWorkspace = useCallback(
    async (id, updatedWorkspaces) => {
      const workspace = (updatedWorkspaces || workspaces).find((w) => w.__id == id);
      const workspaceId = workspace?.__id || DEFAULT_WORKSPACE.__id;

      await localforage.setSelectedWorkspace(workspaceId);

      setWorkspace(workspace || DEFAULT_WORKSPACE);
    },
    [workspaces, setWorkspace]
  );
  const updateWorkspace = useCallback(
    getUpdateWorkspace({
      selectWorkspace,
      setWorkspace,
      setWorkspaces,
      workspace,
      workspaces,
      workspacesRef,
    }),
    [selectWorkspace, setWorkspace, setWorkspaces, workspace, workspaces, workspacesRef]
  );
  const deleteWorkspace = useCallback(
    async (id) => {
      const localWorkspaces = workspaces.filter((w) => w.__id != id);
      const updatedWorkspaces = localWorkspaces.length ? localWorkspaces : [DEFAULT_WORKSPACE];

      selectWorkspace(updatedWorkspaces[0].__id);
      setWorkspaces(updatedWorkspaces);

      await localforage.setUserWorkspaces(updatedWorkspaces);

      await workspacesRef.child(id).remove();
    },
    [selectWorkspace, workspaces, workspacesRef]
  );
  const value = useValue({ deleteWorkspace, selectWorkspace, updateWorkspace, workspaces });
  const workspaceValue = useValue({ updateWorkspace, workspace });

  useEffect(() => {
    if (workspacesRef) {
      (async () => {
        const dbWorkspaces = (await getDbWorkspaces(workspacesRef)) || {};
        const localWorkspaces = (await localforage.getUserWorkspaces()) || [DEFAULT_WORKSPACE];
        const localWorkspacesWithDefault = localWorkspaces.length
          ? localWorkspaces
          : [DEFAULT_WORKSPACE];
        const { workspaces, workspacesMap } = mergeWorkspaces({
          dbWorkspaces,
          localWorkspaces: localWorkspacesWithDefault,
        });

        setWorkspaces(workspaces);

        await workspacesRef.set(workspacesMap);

        const selectedId = await localforage.getSelectedWorkspace();

        selectWorkspace(selectedId, workspaces);
      })();
    }
  }, [setWorkspace, setWorkspaces, workspacesRef]);

  return (
    <UserWorkspacesContext.Provider value={value}>
      <WorkspaceContext.Provider value={workspaceValue}>{children}</WorkspaceContext.Provider>
    </UserWorkspacesContext.Provider>
  );
}

async function getDbWorkspaces(ref) {
  const snapshot = await ref.once('value');

  return flattenRtdb(snapshot);
}

function mergeWorkspaces({ dbWorkspaces, localWorkspaces }) {
  const dbWorkspacesMap = workspacesToMap(dbWorkspaces);
  const localWorkspacesMap = workspacesToMap(localWorkspaces);
  const localIds = localWorkspaces.map((w) => w.__id);
  const dbIds = dbWorkspaces.map((w) => w.__id);
  const ids = [...new Set([...localIds, ...dbIds])];
  const workspaces = ids.reduce((acc, id) => {
    const localWorkspace = localWorkspacesMap[id];
    const dbWorkspace = dbWorkspacesMap[id];
    const useDb = !localWorkspace || dbWorkspace?.updated > localWorkspace.updated;
    const workspace = useDb ? dbWorkspace : localWorkspace;

    return acc.concat([{ __id: id, ...workspace }]);
  }, []);
  const workspacesMap = workspacesToMap(workspaces);

  return { workspaces, workspacesMap };
}

let TIMER;
function getUpdateWorkspace({
  selectWorkspace,
  setWorkspace,
  setWorkspaces,
  workspaces,
  workspacesRef,
}) {

  return async (workspace, options = {}) => {
    const isNew = !workspace?.__id;
    const __id = isNew ? schema.getPushKey() : workspace.__id;
    const updatedWorkspace = {
      ...DEFAULT_WORKSPACE,
      ...workspace,
      __id,
      updated: Date.now(),
    };
    const updatedWorkspaces = produce(workspaces, (draft) => {
      const index = draft.findIndex((w) => w.__id == updatedWorkspace.__id);

      if (!!~index) {
        draft[index] = updatedWorkspace;
      } else {
        draft.push(updatedWorkspace);
      }

      return draft;
    });
    const isCurrentWorkspace = workspace.__id == updatedWorkspace.__id;

    if (isCurrentWorkspace || options.shouldSelect) {
      selectWorkspace(__id, updatedWorkspaces);
    }

    setWorkspaces(updatedWorkspaces);

    await localforage.setUserWorkspaces(updatedWorkspaces);

    try {
      TIMER && clearTimeout(TIMER);

      TIMER = setTimeout(async () => {
        const workspacesMap = workspacesToMap(updatedWorkspaces);

        await workspacesRef.update(workspacesMap);
      }, 500);
    } catch (error) {
      console.error(error);
    }

    return updatedWorkspace;
  };
}

function workspacesToMap(workspaces) {
  return workspaces.reduce((acc, workspace) => {
    const { __id, ...rest } = workspace;

    acc[__id] = rest;

    return acc;
  }, {});
}
