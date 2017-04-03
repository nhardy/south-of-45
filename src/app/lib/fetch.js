// @flow
/* eslint-disable import/prefer-default-export */
export type CheckStatusError = Error & {
  code: number,
  response: Response,
};
/**
 * Takes a `fetch()` response and either returns resolved `Response`
 *   if 200 <= response.status < 300. Otherwise or a rejected
 *   `Promise` with text, code and response.
 * @param {Response} response Response from `fetch()`
 * @returns {Response|Promise} Raw Response or rejected `Promise`
 */
export function checkStatus(response: Response): Response | Promise<CheckStatusError> {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  // $FlowFixMe
  error.code = response.statusCode;
  // $FlowFixMe
  error.response = response;

  return Promise.reject(error);
}
