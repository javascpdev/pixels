import axios from 'axios';
import constants from '~/constants';

export default async function imgurImageUpload({
  accessToken,
  ids = [],
  privacy = 'hidden',
  title = '',
}) {
  const options = {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
  };
  const body = new FormData();

  ids.forEach((id) => body.append('ids[]', id));
  body.append('privacy', privacy);
  body.append('title', title);

  return axios.post(constants.ROUTES.TOOLKIT.IMGUR.ALBUM, body, options);
}
