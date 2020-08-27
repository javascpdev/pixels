import React, { useState } from 'react';

import useValue from '~/hooks/use-value';

export const RootContext = React.createContext();

export default function RootProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const value = useValue({ currentUser, setCurrentUser });

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}
