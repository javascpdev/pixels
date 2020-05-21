const context = require('../../../utilities/dev-context');
const axios = require('axios');

(async () => {
  try {
    const exchangeResponse = await axios.post('http://0.0.0.0:4000/api/imgur/token', {
      grant_type: 'grantType',
      code: '9c849d5b-ccd4-45bd-a56c-fcf0889289b4',
      client_id: context.environment.IMGUR.CLIENT_ID,
      client_secret: context.environment.IMGUR.CLIENT_SECRET,
      redirect_uri: 'redirectUri',
    });
    const { access_token: accessToken } = exchangeResponse.data;

    console.info('accessToken', accessToken);

    const userInfoResponse = await axios.get('http://0.0.0.0:4000/api/imgur/v1/user/info', {
      headers: {
        Authorization: `Client-ID ${accessToken}`,
      },
    });

    console.info('userInfoResponse.data', userInfoResponse.data);
  } catch (error) {
    console.error(error);
    console.error(error.toString());
  }

  process.exit();
})();
