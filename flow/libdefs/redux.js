// @flow

import type { Store } from 'redux';

export type ReduxAction = {
  type: string,
};

export type ReduxState = {};

export type ReduxStore = Store<ReduxState, any>;
