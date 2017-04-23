import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import config from 'app/config';
import { makeAbsoluteUrl } from 'app/lib/social';
import * as appPropTypes from 'app/components/propTypes';
import ErrorView from 'app/views/Error';
import UnsupportedMessage from 'app/components/UnsupportedMessage';
import faviconPng from 'app/assets/images/favicon-1024.png';
import 'app/assets/stylus/reset.styl';
import 'app/assets/stylus/fonts.styl';
import 'font-awesome/css/font-awesome.min.css';
import styles from './styles.styl';


@connect(state => ({
  routeError: state.routeError,
}))
export default class App extends Component {
  static propTypes = {
    routeError: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
    location: appPropTypes.location.isRequired,
  };

  static defaultProps = {
    routeError: undefined,
    children: undefined,
  };

  static childContextTypes = {
    location: appPropTypes.location,
  };

  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet titleTemplate={`%s | ${config.siteName}`} defaultTitle={config.siteName}>
          <link rel="canonical" href={`${config.baseUrl}${this.props.location.pathname}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={makeAbsoluteUrl(faviconPng)} />
          <meta property="og:url" content={`${config.baseUrl}${this.props.location.pathname}`} />
          <meta property="og:site_name" content={config.siteName} />
        </Helmet>
        {this.props.routeError ? (
          <ErrorView {...this.props.routeError} />
        ) : (
          this.props.children
        )}
        <UnsupportedMessage />
      </div>
    );
  }
}
