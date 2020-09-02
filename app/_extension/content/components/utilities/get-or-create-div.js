import constants from '^/constants';

export default function getOrCreateDiv(id = constants.CONTENT.EL_ID) {
  let div = document.getElementById(id);

  if (!div) {
    div = document.createElement('div');
    div.setAttribute('id', id);
  }

  return div;
}
