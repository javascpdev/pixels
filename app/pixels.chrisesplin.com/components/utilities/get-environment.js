export default function getEnvironment() {
  const isServer = typeof window == 'undefined';
  const isExtension = !isServer && location.protocol == 'chrome-extension:';
  const isBrowser = !isServer && !isExtension;
  const isDevTools = isExtension && location.pathname == '/index.html';

  return {
    IS_SERVER: isServer,
    IS_EXTENSION: isExtension,
    IS_BROWSER: isBrowser,
    IS_DEV_TOOLS: isDevTools,
  };
}
