// eslint-disable-next-line import/prefer-default-export
export function isScrolledIntoView(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect();

  return bottom >= 0 &&
    right >= 0 &&
    top <= (window.innerHeight || document.documentElement.clientHeight) &&
    left <= (window.innerWidth || document.documentElement.clientWidth);
}
