import axios from 'axios';
import constants from '~/constants';

export default async function imgurImageUpload({ album, base64, accessToken, title = '', url }) {
  const type = base64 ? 'base64' : 'url';
  const image = base64 || url;
  const options = {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
  };
  const body = new FormData();

  album && body.append('album', album);
  body.append('image', image);
  body.append('type', type);
  body.append('title', title);

  return axios.post(constants.ROUTES.TOOLKIT.IMGUR.IMAGE, body, options);
}
