import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@rmwc/button';
import ConfirmButton from '~/ui/confirm-button';
import Modal from './modal';
import ProgressButton from '~/ui/progress-button';
import ReactDOM from 'react-dom';
import { TextField } from '@rmwc/textfield';
import modalStyles from './modal.module.css';
import useUserWorkspaces from '~/hooks/use-user-workspaces';

export default function EditWorkspaceModalPortal({ isOpen, ...props }) {
  return isOpen
    ? ReactDOM.createPortal(
        <EditWorkspaceModal {...props} />,
        window.document.getElementById('modal')
      )
    : null;
}

function EditWorkspaceModal({ onClose, workspace = {} }) {
  const { deleteWorkspace, selectWorkspace, updateWorkspace } = useUserWorkspaces();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState('');
  const onNameChange = useCallback((e) => setName(e.target.value), [setName]);
  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSaving(true);

      await updateWorkspace({ ...workspace, name }, { shouldSelect: true });

      setIsSaving(false);

      onClose();
    },
    [onClose, name, selectWorkspace, setIsSaving, updateWorkspace, workspace]
  );
  const handleDelete = useCallback(async () => {
    await deleteWorkspace(workspace.__id);

    onClose();
  }, [deleteWorkspace, onClose, workspace]);
  const disabled = !name;

  useEffect(() => {
    if (workspace) {
      setName(workspace.name);
    }
  }, [setName, !!workspace]);

  return (
    <Modal onClose={onClose}>
      <form className={modalStyles.form} onSubmit={handleSave}>
        <TextField
          autoFocus
          type="text"
          placeholder="My workspace"
          label="Workspace name"
          value={name}
          onChange={onNameChange}
        />
        <div className={modalStyles.buttons}>
          <ProgressButton type="submit" raised isWaiting={isSaving} disabled={disabled}>
            Save
          </ProgressButton>

          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          {workspace.__id && (
            <ConfirmButton type="button" onClick={onClose} onClick={handleDelete}>
              Delete
            </ConfirmButton>
          )}
        </div>
      </form>
    </Modal>
  );
}
