// @flow

import type { ReduxAction } from 'app/flowTypes';


export const SET_ROUTE_ERROR = 'SET_ROUTE_ERROR';

export const CLEAR_ROUTE_ERROR = 'CLEAR_ROUTE_ERROR';

export function setRouteError({ status = 500 }: { status?: number } = {}): ReduxAction & { status: number } {
  return {
    type: SET_ROUTE_ERROR,
    status,
  };
}

export function clearRouteError(): ReduxAction {
  return {
    type: CLEAR_ROUTE_ERROR,
  };
}
