import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import config from 'app/config';
import { setRouteError } from 'app/actions/routeError';
import DefaultLayout from 'app/layouts/Default';


@asyncConnect([
  {
    promise: ({ store: { dispatch } }) => {
      return dispatch(setRouteError({ status: 500 }));
    },
  },
])
export default class TestView extends Component { // eslint-disable-line react/prefer-stateless-function
  render() { // eslint-disable-line class-methods-use-this
    return (
      <DefaultLayout>
        <Helmet title={`Test | ${config.siteName}`} />
        <h1>Test</h1>
      </DefaultLayout>
    );
  }
}
