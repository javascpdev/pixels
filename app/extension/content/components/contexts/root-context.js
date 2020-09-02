import React from 'react';
import useValue from '~/hooks/use-value';
import useWorkspaceSync from '^/hooks/use-workspace-sync';

export const RootContext = React.createContext();

export default function RootProvider({ children }) {
  const { tab, workspace } = useWorkspaceSync({ IS_CONTENT: true });
  const value = useValue({ tab, workspace });

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}
