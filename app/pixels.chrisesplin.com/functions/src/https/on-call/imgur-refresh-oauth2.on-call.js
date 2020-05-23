const axios = require('axios');
const Schema = require('../../../utilities/schema');

module.exports = function ImgurRefreshOAuth2(context) {
  const schema = Schema(context);

  return async (args, { auth }) => {
    if (!auth.uid) {
      throw new Error('Auth invalid');
    }

    try {
      const userOAuth2Ref = schema.getUserOAuth2Ref(auth.uid, context.environment.IMGUR.SERVICE_ID);
      const doc = await userOAuth2Ref.get();
      const { refreshToken } = doc.data();

      const response = await axios.post(context.environment.IMGUR.ROUTES.REFRESH, {
        refresh_token: refreshToken,
        client_id: context.environment.IMGUR.CLIENT_ID,
        client_secret: context.environment.IMGUR.CLIENT_SECRET,
        grant_type: 'refresh_token',
      });
      const data = response.data;

      const record = {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type,
        refreshToken: data.refresh_token,
        accountId: data.account_id,
        accountUsername: data.account_username,
        created: Date.now(),
      };

      await userOAuth2Ref.set(record);

      return record;
    } catch (error) {
      console.error(JSON.stringify({ auth }));
    }
  };
};
