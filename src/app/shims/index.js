// @see https://developers.google.com/web/updates/2015/08/using-requestidlecallback
window.requestIdleCallback = window.requestIdleCallback || (callback => setTimeout(() => {
  const start = Date.now();
  callback({
    didTimeout: false,
    timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
  });
}, 1));
window.cancelIdleCallback = window.cancelIdleCallback || (id => clearTimeout(id));
