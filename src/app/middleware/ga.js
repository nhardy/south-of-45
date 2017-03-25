import { endGlobalLoad } from 'redux-connect/lib/store';
import ReactGA from 'react-ga';


export default function gaMiddleware() {
  return next => (action) => {
    if (!__CLIENT__) return next(action);

    const { type } = action;
    if (type === endGlobalLoad.toString()) {
      // Note: Using `window.requestIdleCallback()` here to wait for `react-helmet` to update the page title
      // @see https://github.com/nfl/react-helmet/blob/0ad790830a1121b6c645f4f9a678a60fc604cf94/src/HelmetUtils.js
      window.requestIdleCallback(() => {
        ReactGA.set({ page: window.location.pathname, title: document.title });
        ReactGA.pageview(window.location.pathname);
      });
    }

    return next(action);
  };
}
