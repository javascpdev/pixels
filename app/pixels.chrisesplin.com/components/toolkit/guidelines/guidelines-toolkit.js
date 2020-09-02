import React, { useCallback, useEffect, useState } from 'react';

import { BorderInnerSvg } from '~/svg';
import { DEFAULT_WORKSPACE } from '~/contexts/user-workspaces-context';
import GuidelinesColumn from './guidelines-column';
import GuidelinesTabs from './guidelines-tabs';
import ReactDOM from 'react-dom';
import TabsProvider from '~/contexts/tabs-context';
import Toolkit from '../toolkit';
import UserWorkspacesProvider from '~/contexts/user-workspaces-context';
import WorkspaceSelector from '~/ui/workspace-selector';
import classnames from 'classnames';
import constants from '~/constants';
import getEnvironment from '~/utilities/get-environment';
import produce from 'immer';
import styles from './guidelines.module.css';
import useWorkspace from '~/hooks/use-workspace';
import useWorkspaceSync from '^/hooks/use-workspace-sync';

const { IS_EXTENSION, IS_BROWSER, IS_SERVER } = getEnvironment();

export default function GuidelinesToolkitConnected() {
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
          <TabsProvider>
            <GuidelinesTabs />
          </TabsProvider>
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
  const xLines = workspace.guidelines?.x || DEFAULT_WORKSPACE.guidelines.x;
  const yLines = workspace.guidelines?.y || DEFAULT_WORKSPACE.guidelines.y;

  useWorkspaceSync();

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.extension]: IS_EXTENSION,
        [styles.browser]: IS_BROWSER,
        [styles.browser]: IS_SERVER,
      })}
    >
      <GuidelinesColumn columnName="x" lines={xLines} onChange={getOnChange('x')} />
      <GuidelinesColumn columnName="y" lines={yLines} onChange={getOnChange('y')} />
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
