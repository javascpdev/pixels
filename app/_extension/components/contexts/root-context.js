import React, { useEffect } from 'react';

import { Machine } from 'xstate';
import constants from '^/constants';
import flattenObjectValues from '~/utilities/flatten-object-values';
import localforage from '~/localforage';
import { useMachine } from '@xstate/react';
import useValue from '~/hooks/use-value';

const views = flattenObjectValues(constants.VIEWS);
const on = views.reduce((acc, view) => ((acc[view] = view), acc), {});
const states = views.reduce((acc, view) => ((acc[view] = { on }), acc), {});

const viewMachine = Machine({
  id: 'view',
  initial: constants.VIEWS.DASHBOARD,
  states,
});

export const RootContext = React.createContext();

export default function RootContextProvider({ children }) {
  const [view, navigate] = useMachine(viewMachine);
  const value = useValue({
    navigate,
    view,
  });

  useEffect(() => {
    (async () => {
      const viewValue = await localforage.getExtensionView();

      viewValue && navigate(viewValue);
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      await localforage.setExtensionView(view.value);
    })();
  }, [view]);

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}
