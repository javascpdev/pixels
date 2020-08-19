import React, { useCallback, useState } from 'react';

import produce from 'immer';
import useValue from '~/hooks/use-value';

const DEFAULT_SELECTED = new Set();

export default function useSelected() {
  const [selected, setSelected] = useState(DEFAULT_SELECTED);
  const select = useCallback(
    (id) =>
      setSelected((selected) =>
        produce(selected, (draft) => {
          draft.add(id);
        })
      ),
    [setSelected]
  );
  const deselect = useCallback(
    (id) =>
      setSelected((selected) =>
        produce(selected, (draft) => {
          draft.delete(id);
        })
      ),
    [setSelected]
  );
  const deselectAll = useCallback((id) => setSelected(DEFAULT_SELECTED), [setSelected]);

  return useValue({ deselect, deselectAll, select, selected });
}
