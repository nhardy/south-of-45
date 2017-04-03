// @flow
type Throttled = ((...args: any[]) => void) & { cancel: () => void };

export default function throttle(callback: (...args: any[]) => void): Throttled {
  let id;

  const deferred = (...args: any[]) => () => {
    id = null;
    callback(...args);
  };

  const throttled = (...args: any[]) => {
    if (!id) {
      id = window.requestAnimationFrame(deferred(...args));
    }
  };
  throttled.cancel = () => {
    if (id) {
      window.cancelAnimationFrame(id);
      id = null;
    }
  };

  return throttled;
}
