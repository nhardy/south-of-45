// @flow

import qs from 'querystring';
import { isEmpty } from 'lodash-es';

import type{ ReduxAction } from 'app/flowTypes';
import type { CheckStatusError } from 'app/lib/fetch';
import { checkStatus } from 'app/lib/fetch';


type FetchAction = {
  types: [string, string, string],
  endpoint: {
    url: string,
    query?: {},
  },
};

export default function fetchMiddleware() {
  return (next: (ReduxAction) => void) => (action: ReduxAction | FetchAction): void | Promise<void> => {
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
      // $FlowFixMe
      .then((raw: Response) => raw.json())
      .then(
        (response: {}) => next({
          ...rest,
          response,
          type: SUCCESS,
        }),
        (error: Error | CheckStatusError) => next({
          ...rest,
          error,
          type: FAILURE,
        }),
      )
      .catch((error: Error | {}) => {
        console.error('ERROR IN MIDDLEWARE:', error.stack || error); // eslint-disable-line no-console
        next({
          ...rest,
          error,
          type: FAILURE,
        });
      });
  };
}
