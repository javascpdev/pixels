const Rehost = require('./rehost');

module.exports = function Imgur(context) {
  return {
    rehost: Rehost(context),
  };
};
