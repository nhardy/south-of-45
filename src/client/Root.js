// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { ReduxAsyncConnect } from 'redux-connect';

import getRoutes from 'app/routes';


const Root = ({ store, history }: { store: {}, history: {} }) => (
  <Provider store={store} key="provider">
    <Router
      render={props => (<ReduxAsyncConnect {...props} render={applyRouterMiddleware(useScroll())} />)}
      history={history}
    >
      {getRoutes(store)}
    </Router>
  </Provider>
);

export default Root;
