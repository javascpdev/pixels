import React, { useCallback, useMemo, useState } from 'react';

import { CreateSvg } from '~/svg';
import EditWorkspaceModal from '~/modals/edit-workspace-modal';
import { IconButton } from '@rmwc/icon-button';
import { Select } from '@rmwc/select';
import useUserWorkspaces from '~/hooks/use-user-workspaces';
import useWorkspace from '~/hooks/use-workspace';

const NEW_WORKSPACE_VALUE = '__new';

export default function WorkspaceSelector() {
  const { selectWorkspace, workspaces } = useUserWorkspaces();
  const { workspace } = useWorkspace();
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const onChange = useCallback(
    async (e) => {
      const value = e.target.value;
      const isNew = value == NEW_WORKSPACE_VALUE;

      if (isNew) {
        setIsNew(true);

        setIsEditing(true);
      } else {
        setIsNew(false);

        await selectWorkspace(value);
      }
    },
    [setIsEditing, selectWorkspace]
  );
  const onEdit = useCallback(() => (setIsNew(false), setIsEditing(true)), [setIsEditing]);
  const onClose = useCallback(() => setIsEditing(false), [setIsEditing]);
  const options = useMemo(
    () =>
      workspaces.reduce(
        (acc, workspace) => acc.concat([{ value: workspace.__id, label: workspace.name }]),
        [{ value: NEW_WORKSPACE_VALUE, label: 'Create new workspace' }]
      ),
    [workspace?.__id, workspaces]
  );
  const workspaceToEdit = useMemo(() => (isNew ? {} : workspace), [isNew, workspace]);

  return workspaces.__isLoading ? null : (
    <>
      <EditWorkspaceModal isOpen={isEditing} onClose={onClose} workspace={workspaceToEdit} />
      <IconButton icon={<CreateSvg />} onClick={onEdit} />
      {!isEditing && (
        <Select
          label="Workspaces"
          outlined
          value={workspace?.__id}
          onChange={onChange}
          options={options}
        />
      )}
    </>
  );
}
