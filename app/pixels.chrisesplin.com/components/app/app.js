import Authorization from './authorization';
import Firebase from './firebase';
import { Head } from 'next/document';
import React from 'react';
import { RecoilRoot } from 'recoil';

export default function App({ children, secure }) {
  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head> */}
      <Firebase />
      <RecoilRoot>
        <Authorization secure={secure} />
        <div id="app">{children}</div>
      </RecoilRoot>
    </>
  );
}
