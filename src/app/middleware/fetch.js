import qs from 'querystring';

import { isEmpty } from 'lodash-es';

import { checkStatus } from 'app/lib/fetch';


export default function fetchMiddleware() {
  return next => (action) => {
    const { types, endpoint, ...rest } = action;
    if (!endpoint) {
      return next(action);
    }

    const { url, query = {}, ...requestOptions } = endpoint;
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const search = isEmpty(query) ? '' : `?${qs.stringify(query)}`;
    return fetch(`${url}${search}`, requestOptions)
      .then(checkStatus)
      .then(raw => raw.json())
      .then(
        response => next({
          ...rest,
          response,
          type: SUCCESS,
        }),
        error => next({
          ...rest,
          error,
          type: FAILURE,
        })
      )
      .catch((error) => {
        console.error('ERROR IN MIDDLEWARE:', error.stack || error); // eslint-disable-line no-console
        next({
          ...rest,
          error,
          type: FAILURE,
        });
      });
  };
}
