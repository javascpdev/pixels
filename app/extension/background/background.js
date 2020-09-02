import liveReload from '_background/utilities/live-reload';
(async () => {
  console.info('background.js loaded', new Date().toString());

  refreshCurrentWindow();

  const unlistenLiveReload = liveReload(() => {
    console.info('reloading...');

    chrome.runtime.reload();
  });
})();

function refreshCurrentWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
  });
}
