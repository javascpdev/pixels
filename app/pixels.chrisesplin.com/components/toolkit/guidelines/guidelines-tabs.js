import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@rmwc/button';
import classnames from 'classnames';
import getEnvironment from '~/utilities/get-environment';
import produce from 'immer';
import styles from './guidelines.module.css';
import useDebouncedValue from '~/hooks/use-debounced-value';
import useTabs from '~/hooks/use-tabs';
import useValue from '~/hooks/use-value';

const { IS_EXTENSION, IS_BROWSER, IS_SERVER } = getEnvironment();
const DEFAULT_WORKSPACE_TAB = { x: 0, y: 0, active: false };
const DEFAULT_LOCAL_OFFSETS = [];

export default function GuidelinesTabs() {
  const { resetWorkspace, tabs, workspaceTabs } = useTabs();
  const { getWorkspaceTabChanged, localOffsets } = useLocalTabs();
  const resetDisabled = useMemo(() => !Object.keys(workspaceTabs || {}).length, [workspaceTabs]);

  return (
    <div
      className={classnames(styles.tabs, {
        [styles.extension]: IS_EXTENSION,
        [styles.browser]: IS_BROWSER,
        [styles.browser]: IS_SERVER,
      })}
    >
      <h1>Tab</h1>

      <table>
        <thead>
          <tr>
            <th>active</th>
            <th>x offset</th>
            <th>y offset</th>
            <th></th>
            <th className={styles.actionsRow}>
              {!IS_EXTENSION && <OpenDevToolsPrompt />}

              <Button
                outlined
                className={styles.resetButton}
                onClick={resetWorkspace}
                disabled={resetDisabled}
              >
                Reset
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tabs.map((tab, i) => {
            const { x: xOffset, y: yOffset, active } =
              localOffsets[tab.id] || (workspaceTabs && workspaceTabs[tab.id]) || {};

            return (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    checked={active || false}
                    onChange={getWorkspaceTabChanged({ key: 'active', tab })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="x"
                    value={xOffset || 0}
                    onChange={getWorkspaceTabChanged({ key: 'x', tab })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="y"
                    value={yOffset || 0}
                    onChange={getWorkspaceTabChanged({ key: 'y', tab })}
                  />
                </td>
                <td>
                  <img className={styles.favicon} src={tab.favIconUrl} />
                </td>
                <td className={styles.title}>{tab.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OpenDevToolsPrompt() {
  return <aside>The Pixels tab must be open in Dev Tools to sync tabs.</aside>;
}

function useLocalTabs() {
  const { workspaceTabs, updateWorkspaceTabs } = useTabs();
  const [localOffsets, setLocalOffsets] = useState(DEFAULT_LOCAL_OFFSETS);
  const getWorkspaceTabChanged = useCallback(
    ({ key, tab }) => (e) => {
      const existingTab = workspaceTabs && workspaceTabs[tab.id];
      const updatedOffsets = { ...(existingTab || DEFAULT_WORKSPACE_TAB) };

      if (key == 'active') {
        updatedOffsets[key] = e.target.checked;
      } else {
        updatedOffsets[key] = +e.target.value;
      }

      setLocalOffsets((localOffsets) =>
        produce(localOffsets, (draft) => {
          draft[tab.id] = updatedOffsets;
        }),
      );
    },
    [workspaceTabs, setLocalOffsets],
  );
  const debouncedLocalOffsets = useDebouncedValue(localOffsets, 500);

  useEffect(() => {
    (async () => {
      const updates = {};
      let i = debouncedLocalOffsets.length;
      let isDirty = false;

      while (i--) {
        const offsets = debouncedLocalOffsets[i];

        if (offsets) {
          updates[i] = offsets;
          isDirty = true;
        }
      }

      isDirty && (await updateWorkspaceTabs(updates));
    })();
  }, [debouncedLocalOffsets]);

  useEffect(() => {
    setLocalOffsets(DEFAULT_LOCAL_OFFSETS);
  }, [setLocalOffsets, workspaceTabs]);

  return useValue({ getWorkspaceTabChanged, localOffsets });
}
