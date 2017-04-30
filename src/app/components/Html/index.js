import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';

import faviconSvg from 'app/assets/images/favicon.svg';
import faviconPng16 from 'app/assets/images/favicon-16.png';
import faviconPng32 from 'app/assets/images/favicon-32.png';
import faviconPng96 from 'app/assets/images/favicon-96.png';
import faviconPng192 from 'app/assets/images/favicon-192.png';


const Html = ({ assets, component, store }) => {
  const content = component ? ReactDOMServer.renderToString(component) : '';
  const helmet = Helmet.renderStatic(); // magic.gif

  /* eslint-disable react/no-danger */
  return (
    <html lang="en-AU" {...helmet.htmlAttributes.toComponent()}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {helmet.title.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {helmet.meta.toComponent()}
        <link rel="icon" type="image/svg+xml" sizes="any" href={faviconSvg} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconPng16} />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconPng32} />
        <link rel="icon" type="image/png" sizes="96x96" href={faviconPng96} />
        <link rel="icon" type="image/png" sizes="192x192" href={faviconPng192} />
        <link rel="shortcut icon" href="/favicon.ico" />
        {helmet.link.toComponent()}
        {helmet.base.toComponent()}
        {__DEVELOPMENT__ ? <script type="text/javascript" src="/webpack-dev-server.js" /> : null}
        {assets.head.js.map(path => (
          <script key={path} type="text/javascript" src={path} async defer />
        ))}
        {helmet.script.toComponent()}
        {assets.vendor.css && assets.vendor.css.map(path => (
          <link key={path} rel="stylesheet" type="text/css" href={path} />
        ))}
        {assets.bundle.css && assets.bundle.css.map(path => (
          <link key={path} rel="stylesheet" type="text/css" href={path} />
        ))}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data=${JSON.stringify(store.getState())};`,
          }}
        />
        {assets.runtime.js.map(path => (
          <script key={path} type="text/javascript" src={path} async defer />
        ))}
        {assets.vendor.js.map(path => (
          <script key={path} type="text/javascript" src={path} async defer />
        ))}
        {assets.bundle.js.map(path => (
          <script key={path} type="text/javascript" src={path} async defer />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.shape({
    bundle: PropTypes.shape({
      css: PropTypes.arrayOf(PropTypes.string),
      js: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  component: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Html;
