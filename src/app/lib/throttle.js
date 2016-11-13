export default function throttle(callback) {
  let id;

  const deferred = (...args) => () => {
    id = null;
    callback(...args);
  };

  const throttled = (...args) => {
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
