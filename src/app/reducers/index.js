import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as scripts } from 'redux-scripts-manager';

import routeError from './routeError';
import github from './github';


export default combineReducers({
  reduxAsyncConnect,
  routing: routerReducer,
  scripts,

  routeError,
  github,
});
