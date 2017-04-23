import React from 'react';

import styles from './styles.styl';


/* eslint-disable react/no-danger */
const UnsupportedMessage = () => (
  <div>
    <div className={styles.wrapper} id="unsupportedMessage" style={{ display: 'none' }}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h1>Sorry, you&apos;re using an unsupported browser</h1>
          <p>
            It looks like you&apos;re using an outdated browser that isn&apos;t supported by this website.
            {' '}
            Please <a href="http://browsehappy.com/">upgrade now</a>.
            {' '}
            Upgrading to a newer browser allows developers to create a richer user experience on the web
            {' '}
            and makes sure that you&apos;re always up to date with the latest features and security patches.
          </p>
          <code id="userAgentDebugInfo" />
          <p>
            If you think there has been a mistake, visit the
            {' '}
            <a href="/contact" target="_blank" rel="noopener noreferrer">contact page</a>
            {' '}
            in an alternate browser and include the debug information above.
          </p>
        </div>
      </div>
    </div>
    <noscript
      className={styles.wrapper}
      dangerouslySetInnerHTML={{
        __html: `<div class="${styles.container}">
          <div class="${styles.inner}">
            <h1>Sorry, you&apos;ve got JavaScript turned off</h1>
            <p>
              It looks like you&apos;ve turned JavaScript off. That isn&apos;t supported.
              <a href="http://www.enable-javascript.com/">Turn JavaScript on</a>.
            </p>
          </div>
        </div>`.replace(/\s{2,}/g, ''),
      }}
    />
  </div>
);

export default UnsupportedMessage;
