/* globals window */

import React, { useCallback, useMemo } from 'react';

import { createSnackbarQueue } from '@rmwc/snackbar';

export const AlertsContext = React.createContext();

const queue = createSnackbarQueue();

export default function AlertsProvider({ children }) {
  const handleError = useCallback(error => {
    console.info(error);

    queue.notify({
      body: error.toString(),
      actions: [
        {
          title: 'Dismiss',
        },
      ],
    });
  }, []);

  const value = useMemo(() => ({ queue, handleError, alert: handleError }), [handleError, queue]);

  if (process.browser) {
    window.handleError = handleError;
  }

  return (
    <ErrorBoundary handleError={handleError}>
      <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    this.props.handleError({ error, info });
  }

  render() {
    return this.props.children;
  }
}
