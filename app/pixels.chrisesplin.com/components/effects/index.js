/* globals window */

import updateOAuth2 from './update-oauth2';

export default {
  updateOAuth2: wrapEffect(updateOAuth2),
};

function wrapEffect(effect) {
  const isDev =
    typeof window != 'undefined' &&
    window.environment &&
    window.environment.environment == 'development';
  const name = effect.name;

  return async (...args) => {
    try {
      isDev && console.time && console.time(name);

      const result = await effect(...args);

      isDev && console.time && console.timeEnd(name);

      return result;
    } catch (error) {
      console.info(`${name} effect failed!`);
      console.error(error);
    }
  };
}
