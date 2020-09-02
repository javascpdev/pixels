module.exports = {
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'last 1 chrome versions' } }],
    '@babel/preset-react',
  ],
};
