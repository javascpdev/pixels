import React, { useCallback, useEffect, useState } from 'react';

import getEnvironment from '~/utilities/get-environment';
import produce from 'immer';
import styles from './guidelines.module.css';
import useDebouncedValue from '~/hooks/use-debounced-value';
import useTabs from '~/hooks/use-tabs';
import useValue from '~/hooks/use-value';

const { IS_EXTENSION } = getEnvironment();
const DEFAULT_OFFSETS = { x: 0, y: 0 };
const DEFAULT_LOCAL_OFFSETS = [];

export default function GuidelinesTabs() {
  const { getOnOffsetChange, localOffsets, tabs } = useLocalTabs();

  /**
   * TODO: 
   * [ ] Click a button to reset the tabs
   * [ ] Refactor offsets into their own data structure so that adding/deleting tabs 
   *     doesn't blow them all away
   */

  return (
    <div className={styles.tabs}>
      <h1>TABS</h1>
      {!IS_EXTENSION && <OpenDevToolsPrompt />}
      <table>
        <thead>
          <tr>
            <th>x offset</th>
            <th>y offset</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tabs.map((tab, index) => {
            const offsets = localOffsets[index] || tab.offsets || {};

            return (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    placeholder="x"
                    value={offsets.x || 0}
                    onChange={getOnOffsetChange({ index, key: 'x', tab })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="y"
                    value={offsets.y || 0}
                    onChange={getOnOffsetChange({ index, key: 'y', tab })}
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
  const { tabs, updateTabs } = useTabs();
  const [localOffsets, setLocalOffsets] = useState(DEFAULT_LOCAL_OFFSETS);
  const getOnOffsetChange = useCallback(
    ({ index, key, tab }) => (e) => {
      const offsets = { ...(tab.offsets || DEFAULT_OFFSETS) };

      offsets[key] = +e.target.value;

      setLocalOffsets((localOffsets) =>
        produce(localOffsets, (draft) => {
          draft[index] = offsets;
        }),
      );
    },
    [setLocalOffsets],
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
          updates[`${i}/offsets`] = offsets;
          isDirty = true;
        }
      }

      isDirty && (await updateTabs(updates));
    })();
  }, [debouncedLocalOffsets, updateTabs]);

  useEffect(() => {
    setLocalOffsets(DEFAULT_LOCAL_OFFSETS);
  }, [setLocalOffsets, tabs]);

  return useValue({ getOnOffsetChange, localOffsets, tabs });
}
