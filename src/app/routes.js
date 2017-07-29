// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import type { ReduxStore } from 'app/flowTypes';
import { clearRouteError } from 'app/actions/routeError';
import App from 'app/components/App';
import HomeView from 'app/views/Home';
import ErrorView from 'app/views/Error';


export default function getRoutes(store: ReduxStore) {
  const onChange = () => {
    store.dispatch(clearRouteError());
  };
  return (
    <Route path="/" component={App} onChange={onChange}>
      <Route path="/__404" component={ErrorView} status={404} />
      <Route path="/__500" component={ErrorView} status={500} />
      <IndexRoute component={HomeView} />
      <Route path="*" component={ErrorView} status={404} />
    </Route>
  );
}
