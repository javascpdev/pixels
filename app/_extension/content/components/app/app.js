import React from 'react';
import RootProvider from '_content/components/contexts/root-context';
import useTab from '_content/components/hooks/use-tab';

export default function AppConnected() {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

function App() {
  const tab = useTab();
  console.log('tab', tab);
  return !tab?.active ? null : <h1>Content App.js</h1>;
}
