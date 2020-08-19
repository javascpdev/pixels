import { useCallback, useState } from 'react';

import useKeyup from './use-keyup';
import useSelected from './use-selected';
import useValue from './use-value';

export default function useMultiSelect({ ids }) {
  const { deselect, deselectAll, select, selected } = useSelected();
  const getOnClick = useCallback(
    (id) => (e) => {
      const isCtrlClick = e.ctrlKey;
      const isShiftClick = e.shiftKey;

      if (isCtrlClick) {
        const isSelected = selected.has(id);

        isSelected ? deselect(id) : select(id);
      } else if (isShiftClick) {
        const { index, firstSelectedIndex, lastSelectedIndex } = getSelected({ id, ids, selected });
        let i = ids.length;

        while (i--) {
          const shouldSelect = shouldShiftSelect({
            i,
            ids,
            index,
            firstSelectedIndex,
            lastSelectedIndex,
          });

          shouldSelect && select(ids[i]);
        }
      } else {
        deselectAll();

        select(id);
      }
    },
    [ids, deselect, select, selected]
  );

  useKeyup(
    (e) => {
      if (e.key == 'Escape') {
        deselectAll();
      }
    },
    [deselectAll]
  );

  return useValue({ deselectAll, getOnClick, selected });
}

function getSelected({ id, ids, selected }) {
  let i = ids.length;
  let index = -1;
  let firstSelectedIndex = -1;
  let lastSelectedIndex = -1;

  while (i--) {
    const isSelected = selected.has(ids[i]);

    if (ids[i] == id) {
      index = i;
    }

    if (isSelected) {
      if (!~lastSelectedIndex) {
        firstSelectedIndex = i;
        lastSelectedIndex = i;
      } else {
        firstSelectedIndex = i;
      }
    }
  }

  return { index, firstSelectedIndex, lastSelectedIndex };
}

function shouldShiftSelect({ i, ids, index, firstSelectedIndex, lastSelectedIndex }) {
  const id = ids[i];
  const isAfterFirst = i > firstSelectedIndex;
  const isBeforeLast = i < lastSelectedIndex;
  const isBeforeIndex = i <= index;
  const isAfterIndex = i >= index;
  let result = false;

  if (isAfterFirst && isBeforeIndex) {
    result = true;
  } else if (isBeforeLast && isAfterIndex) {
    result = true;
  }

  return result;
}
