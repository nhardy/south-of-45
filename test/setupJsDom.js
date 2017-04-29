// @flow

import { JSDOM } from 'jsdom';


// Initialise JSDOM and propagate globals
// @see https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md#using-enzyme-with-jsdom

global.window = new JSDOM(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Title</title>
</head>
<body>
<div id="root"></div>
</body>
</html>`);
global.document = window.document;
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});
global.navigator = {
  userAgent: 'node.js',
};
