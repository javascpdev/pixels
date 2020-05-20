import React from 'react';
import ReactDOM from 'react-dom';

export default function TitlePortal(props) {
  if (!process.browser) {
    return null;
  }

  return ReactDOM.createPortal(<Title {...props} />, window.document.getElementById('title'));
}

function Title({ title = 'Pixels' }) {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
