import App from '_content/components/app/app';
import React from 'react';
import ReactDOM from 'react-dom';
import getOrCreateDiv from '_content/components/utilities/get-or-create-div';
import observeRemoval from '_content/components/utilities/observe-removal';

(() => {
  const nodes = mountParentNode();

  renderIntoParentNode(nodes);
})();

function mountParentNode() {
  const parentNode = document.documentElement;
  const rootNode = getOrCreateDiv();
  const nodes = { parentNode, rootNode };

  parentNode.appendChild(rootNode);

  return nodes;
}

function renderIntoParentNode(nodes) {
  observeRemoval(nodes);

  ReactDOM.render(<App parentNode={nodes.parentNode} />, nodes.rootNode);
}
