import UAParser from 'ua-parser-js';


// This should be the only place we need to add support for this
function onReady(listener) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', listener);
  } else {
    document.attachEvent('onload', listener);
  }
}

onReady(() => {
  const ua = new UAParser().getResult();
  const version = parseInt(ua.browser.version.split('.')[0], 10) || 0;

  if (ua.browser.name === 'IE'
    || ua.browser.name === 'IE Mobile'
    || ua.browser.name === 'Android Browser'
    || ((ua.browser.name === 'Safari' || ua.browser.name === 'Mobile Safari') && version < 9)
    || (ua.browser.name === 'Chrome' && version < 50)
    || (ua.browser.name === 'Firefox' && version < 45)
  ) {
    document.getElementById('unsupportedMessage').style.display = '';
  }
});
