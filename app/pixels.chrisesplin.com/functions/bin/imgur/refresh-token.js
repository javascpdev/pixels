const context = require('../../utilities/dev-context');
const imgurRefreshOAuth2 = require('../../src/https/on-call/imgur-refresh-oauth2.on-call')(context);

const uid = 'Qw9kiGUbYEdnl4Wm1tw8HrZkoeF2';

(async () => {
  try {
    const response = await imgurRefreshOAuth2({}, { auth: { uid } });

    console.info('response', response);
  } catch (error) {
    console.error(error);
    console.error(error.toString());
  }

  process.exit();
})();
