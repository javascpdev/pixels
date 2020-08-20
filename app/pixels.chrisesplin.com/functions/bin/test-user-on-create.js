const context = require('../utilities/dev-context');
const userOnCreate = require('../src/auth/user.on-create')(context);
const uid = 'Qw9kiGUbYEdnl4Wm1tw8HrZkoeF2';

(async () => {
  const searchKey = await userOnCreate({ uid });

  console.log('custom claim set', { searchKey });

  process.exit();
})();
