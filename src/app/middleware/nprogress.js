import { beginGlobalLoad, endGlobalLoad } from 'redux-connect/lib/store';
import NProgress from 'nprogress';

import type { ReduxAction } from 'app/flowTypes';


export default function nprogressMiddleware() {
  return (next: (ReduxAction) => void) => (action: ReduxAction) => {
    if (!__CLIENT__) return next(action);

    switch (action.type) {
      case beginGlobalLoad.toString():
        NProgress.start();
        break;
      case endGlobalLoad.toString():
        NProgress.done();
        break;
      default:
        break;
    }

    return next(action);
  };
}
