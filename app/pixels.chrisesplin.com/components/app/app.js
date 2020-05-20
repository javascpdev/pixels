import Authorization from './authorization';
import Firebase from './firebase';
import React from 'react';
import { RecoilRoot } from 'recoil';

export default function App({ children, secure }) {
  return (
    <>
      <Firebase />
      <RecoilRoot>
        <Authorization secure={secure} />
        <div id="app">{children}</div>
      </RecoilRoot>
    </>
  );
}
