// @flow

import React from 'react';
import { Helmet } from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';
import styles from '../Home/styles.styl';


const ErrorView = ({ route: { status } }: { route: { status: number }}) => (
  <DefaultLayout className={styles.root}>
    <Helmet>
      <title>{`HTTP ${status} Error`}</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <h1>HTTP {status} Error</h1>
    {status === 404 ? (
      <p>
        The requested page could not be found.
        {' '}
        <em>Sorry</em>.
      </p>
    ) : (
      <p>
        An unexpected error occurred trying to serve your request.
        {' '}
        <em>Sorry</em>.
      </p>
    )}
  </DefaultLayout>
);

export default ErrorView;
