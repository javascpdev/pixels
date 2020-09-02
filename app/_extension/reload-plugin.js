const WebSocket = require('ws');
const port = 41000;

module.exports = class ReloadPlugin {
  constructor() {
    this.wss = new WebSocket.Server({ port });

    console.info('websockets listening on port', port);

    this.wss.on('connection', async (ws) => {
      ws.send(JSON.stringify({ listening: true }));

      this.ws = ws;
    });
  }

  apply(compiler) {
    compiler.hooks.done.tap('ReloadPlugin', () => {
      console.info('reloading...');
      this.ws.send(JSON.stringify({ reload: true }));
    });
  }
};
