/* globals window */

import deleteOAuth2 from './delete-oauth2';
import imgurCreateAlbum from './imgur-create-album';
import imgurImageUpload from './imgur-image-upload';
import setOAuth2 from './set-oauth2';

export default {
  deleteOAuth2: wrapEffect(deleteOAuth2),
  imgurCreateAlbum: wrapEffect(imgurCreateAlbum),
  imgurImageUpload: wrapEffect(imgurImageUpload),
  setOAuth2: wrapEffect(setOAuth2),
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

      return error;
    }
  };
}
