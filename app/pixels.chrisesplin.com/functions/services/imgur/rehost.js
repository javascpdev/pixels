module.exports = function Rehost(context) {
  return (...args) => {
    console.log('rehosting...', context, args);
  };
};
