import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';
import { ReduxAsyncConnect } from 'redux-connect';

import getRoutes from 'app/routes';


function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const Root = ({ store, history }) => {
  return (
    <Provider store={store} key="provider">
      <Router
        render={props => (<ReduxAsyncConnect {...props} render={applyRouterMiddleware(useScroll())} />)}
        onUpdate={logPageView}
        history={history}>
        {getRoutes(store)}
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Root;
