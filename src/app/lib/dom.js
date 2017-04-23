// @flow

// eslint-disable-next-line import/prefer-default-export
export function isScrolledIntoView(el: HTMLElement): boolean {
  const { top, left, bottom, right } = el.getBoundingClientRect();

  return bottom >= 0
    && right >= 0
    && top <= window.innerHeight
    && left <= window.innerWidth;
}
