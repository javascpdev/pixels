export default function liveReload(cb) {
  const socket = new WebSocket('ws://localhost:41000');
  const onMessage = getOnMessage(cb);

  socket.addEventListener('message', onMessage);

  return () => socket.removeEventListener('message', onMessage);
}

function getOnMessage(cb) {
  return (event) => {
    const { reload } = JSON.parse(event.data);

    reload && cb();
  };
}
