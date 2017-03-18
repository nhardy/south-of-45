import React from 'react';

import styles from './styles.styl';


/* eslint-disable react/no-danger */
const UnsupportedMessage = () => (
  <div>
    <div className={styles.wrapper} id="unsupportedMessage" style={{ display: 'none' }}>
      <div className={styles.container}>
        <h1>Sorry, you&apos;re using an unsupported browser</h1>
        <p>
          It looks like you&apos;re using an outdated browser that isn&apos;t supported by this website.
          {' '}
          <a href="http://browsehappy.com/">Upgrade now</a>.
        </p>
      </div>
    </div>
    <noscript
      className={styles.wrapper}
      dangerouslySetInnerHTML={{
        __html: `<div class="${styles.container}">
          <h1>Sorry, you&apos;ve got JavaScript turned off</h1>
          <p>
            It looks like you&apos;ve turned JavaScript off. That isn&apos;t supported.
            <a href="http://www.enable-javascript.com/">Turn JavaScript on</a>.
          </p>
        </div>`.replace(/\s{2,}/g, ''),
      }} />
  </div>
);

export default UnsupportedMessage;
