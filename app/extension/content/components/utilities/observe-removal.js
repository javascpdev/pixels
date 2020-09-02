import ReactDOM from 'react-dom';
import constants from '^/constants';

export default function observeRemoval({ parentNode, rootNode }) {
  const observer = new MutationObserver(([{ removedNodes }], observer) => {
    const wrapperRemoved = !![...removedNodes].find((el) => el.id == constants.CONTENT.EL_ID);

    wrapperRemoved && ReactDOM.unmountComponentAtNode(rootNode);
    observer.disconnect();
  });

  parentNode.appendChild(rootNode);
  observer.observe(parentNode, { childList: true });
}
