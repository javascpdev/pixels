import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_WORKSPACE } from './user-workspaces-context';
import getEnvironment from '~/utilities/get-environment';
import produce from 'immer';
import schema from '~/schema';
import useChrome from '^/hooks/use-chrome';
import useCurrentUser from '~/hooks/use-current-user';
import useValue from '~/hooks/use-value';
import useWorkspace from '~/hooks/use-workspace';

const { IS_EXTENSION } = getEnvironment();
const TAB_EVENTS = ['onCreated', 'onUpdated', 'onRemoved'];

const DEFAULT_TABS = Object.assign([], { __isLoading: true });
export const TabsContext = React.createContext();

export default function TabsProvider({ children }) {
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const { workspace, updateWorkspace } = useWorkspace();
  const currentUser = useCurrentUser();
  const chrome = useChrome();
  const tabsRef = useMemo(() => currentUser && schema.getUserTabsRef(currentUser.uid), [
    currentUser,
  ]);
  const refreshTabs = useCallback(() => {
    chrome.tabs.query({}, async (tabs) => tabsRef.set(tabs));
  }, [chrome, tabsRef]);
  const updateWorkspaceTabs = useCallback(
    async (updates) => {
      const updatedWorkspace = produce(workspace, (draft) => {
        if (!draft.tabs) {
          draft.tabs = [];
        }

        for (const key in updates) {
          draft.tabs[key] = updates[key];
        }
      });

      await updateWorkspace(updatedWorkspace);
    },
    [workspace],
  );
  const resetWorkspace = useCallback(async () => {
    await updateWorkspace({ ...workspace, tabs: DEFAULT_WORKSPACE.tabs });
  }, [updateWorkspace]);
  const workspaceTabs = useMemo(() => workspace.tabs, [workspace]);
  const value = useValue({
    refreshTabs,
    resetWorkspace,
    workspaceTabs,
    tabs,
    updateWorkspaceTabs,
  });

  useLocalTabs({ setTabs, tabsRef });
  useDbTabs({ chrome, refreshTabs, tabsRef });

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function useLocalTabs({ setTabs, tabsRef }) {
  useEffect(() => {
    if (tabsRef) {
      tabsRef.on('value', (snapshot) => {
        const tabs = snapshot.val() || [];

        setTabs(tabs);
      });
    }
  }, [setTabs, tabsRef]);
}

function useDbTabs({ chrome, refreshTabs, tabsRef }) {
  if (IS_EXTENSION) {
    useEffect(() => {
      if (tabsRef) {
        refreshTabs();

        const events = TAB_EVENTS.map((event) => chrome.tabs[event]);

        events.forEach((event) => event.addListener(refreshTabs));

        return () => events.forEach((event) => event.removeListener(refreshTabs));
      }
    }, [chrome, refreshTabs, tabsRef]);
  }
}
