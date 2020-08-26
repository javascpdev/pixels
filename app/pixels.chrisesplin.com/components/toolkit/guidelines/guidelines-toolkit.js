import { AddSvg, BorderInnerSvg, CloseSvg } from '~/svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IconButton } from '@rmwc/icon-button';
import ReactDOM from 'react-dom';
import { TextField } from '@rmwc/textfield';
import Toolkit from '../toolkit';
import UserWorkspacesProvider from '~/contexts/user-workspaces-context';
import WorkspaceSelector from '~/ui/workspace-selector';
import constants from '~/constants';
import produce from 'immer';
import styles from './guidelines.module.css';
import useWorkspace from '~/hooks/use-workspace';
import { v4 as uuid } from 'uuid';

export default function ImgurToolkitConnected() {
  return (
    <Toolkit
      icon={
        <BorderInnerSvg width="2.5em" height="2.5em" fill={constants.COLORS.MDC_THEME_SECONDARY} />
      }
      title="Guidelines"
    >
      <UserWorkspacesProvider>
        <>
          <GuidelinesToolkitMenu />
          <GuidelinesToolkitWrapper />
        </>
      </UserWorkspacesProvider>
    </Toolkit>
  );
}

function GuidelinesToolkitWrapper() {
  const { updateWorkspace, workspace } = useWorkspace();
  const getOnChange = useCallback(
    (key) => async (lines) => {
      const guidelines = produce(workspace.guidelines, (draft) => {
        draft[key] = sortLines(lines);
      });

      await updateWorkspace({ ...workspace, guidelines });
    },
    [workspace],
  );

  return (
    <div className={styles.wrapper}>
      <GuidelinesColumn columnName="x" lines={workspace.guidelines.x} onChange={getOnChange('x')} />
      <GuidelinesColumn columnName="y" lines={workspace.guidelines.y} onChange={getOnChange('y')} />
    </div>
  );
}

function GuidelinesColumn({ columnName, lines, onChange }) {
  const newLineInputRef = useRef();
  const onAdd = useCallback(
    (e) => {
      e.preventDefault();

      const value = newLineInputRef.current.value;
      const updatedLines = [...lines, { id: uuid(), value }];

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const getLineOnChange = useCallback(
    (id) => (e) => {
      const value = e.target.value;
      const lineIndex = lines.findIndex((l) => l.id == id);
      const updatedLines = produce(lines, (draft) => {
        draft[lineIndex] = { id, value };
      });

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const getLineOnDelete = useCallback(
    (id) => () => {
      const lineIndex = lines.findIndex((l) => l.id == id);
      const updatedLines = produce(lines, (draft) => {
        draft.splice(lineIndex, 1);
      });

      onChange(updatedLines);
    },
    [lines, onChange],
  );
  const onFocus = useCallback((e) => e.target.select());

  return (
    <div className={styles.guidelinesColumn}>
      <h2>{columnName}</h2>

      <ul>
        <li key={`add-${columnName}`} className={styles.addWrapper}>
          <form onSubmit={onAdd}>
            <input
              ref={newLineInputRef}
              type="number"
              min={0}
              defaultValue={50}
              onFocus={onFocus}
            />
            <IconButton type="submit" icon={<AddSvg fill="var(--mdc-theme-primary-dark)" />} />
          </form>
        </li>
        {lines.map((line) => {
          return (
            <li key={line.id}>
              <input
                type="number"
                min={0}
                value={line.value}
                onChange={getLineOnChange(line.id)}
                onFocus={onFocus}
              />
              <IconButton
                icon={<CloseSvg fill="var(--mdc-theme-primary-dark)" />}
                onClick={getLineOnDelete(line.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GuidelinesToolkitMenu() {
  const [el, setEl] = useState();

  useEffect(() => {
    setTimeout(() => {
      const el = typeof window != 'undefined' && window.document.getElementById('toolkit-menu');

      setEl(el);
    });
  }, []);

  return el
    ? ReactDOM.createPortal(
        <>
          <WorkspaceSelector />
        </>,
        el,
      )
    : null;
}

function sortLines(lines) {
  return lines.slice(0).sort((a, b) => (+a.value > +b.value ? 1 : -1));
}
