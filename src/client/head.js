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
  const parser = new UAParser();
  const ua = parser.getUA();
  const result = parser.getResult();
  const version = parseInt(result.browser.major, 10);

  if (result.browser.name === 'IE'
    || (
      result.browser.name === 'IEMobile'
      && ua.indexOf('bingbot') === -1
      && ua.indexOf('BingPreview') === -1
    )
    || result.browser.name === 'Android Browser'
    || ((result.browser.name === 'Safari' || result.browser.name === 'Mobile Safari') && version < 9)
    || (
      result.browser.name === 'Chrome' && version < 49
      && ua.indexOf('Googlebot') === -1
      && ua.indexOf('Google Search Console') === -1
      && ua.indexOf('Google Page Speed') === -1
    )
    || (result.browser.name === 'Firefox' && version < 45)
  ) {
    document.getElementById('userAgentDebugInfo').innerText = ua;
    document.getElementById('unsupportedMessage').style.display = '';
  }
});
