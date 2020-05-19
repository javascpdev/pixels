import React from 'react';
import ReactDOM from 'react-dom';

export default function TitlePortal() {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(<Title />, window.document.getElementById('title'));
}

function Title() {
  return (
    <>
      <h1>Pixels</h1>
    </>
  );
}
