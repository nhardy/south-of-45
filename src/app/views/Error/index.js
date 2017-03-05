import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import config from 'app/config';
import DefaultLayout from 'app/layouts/Default';

import styles from '../Home/styles.styl';


const ErrorView = ({ route: { status } }) => (
  <DefaultLayout className={styles.root}>
    <Helmet title={`HTTP ${status} Error | ${config.siteName}`} />
    <h1>HTTP {status} Error</h1>
    {status === 404 ? (
      <p>
        The requested page could not be found.
        {' '}
        <em>Sorry</em>.
        {' '}
        Think something's missing?
        {' '}
        <Link to="/contact">Contact me</Link> and let me know.
      </p>
    ) : (
      <p>
        An unexpected error occurred trying to serve your request.
        {' '}
        <em>Sorry</em>.
        {' '}
        <Link to="/contact">Contact me</Link> and let me know.
        {' '}
        If <em>this</em> is the contact page, terribly sorry.
      </p>
    )}
  </DefaultLayout>
);

ErrorView.propTypes = {
  route: PropTypes.shape({
    status: PropTypes.number,
  }),
};

export default ErrorView;
