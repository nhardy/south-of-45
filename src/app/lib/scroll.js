// @flow

import { noop } from 'lodash-es';

import headerStyles from 'app/components/SiteHeader/styles.styl';


function timing(frame, start, end, duration) {
  const t = frame / duration;
  return (-end * t * (t - 2)) + start;
}

// eslint-disable-next-line import/prefer-default-export
export function smoothScrollTo(scrollY: number, callback?: () => void = noop) {
  let currentFrame = 0;
  const startScrollY = window.scrollY;
  const difference = startScrollY - scrollY;
  const duration = 50;

  const animate = () => {
    const newScrollY = startScrollY - timing(currentFrame, 0, difference, duration);
    window.scrollTo(0, newScrollY);
    if (currentFrame >= duration || newScrollY === scrollY) {
      callback();
    } else {
      currentFrame += 1;
      window.requestAnimationFrame(animate);
    }
  };
  animate();
}

export function smoothScrollToId(id: string, callback?: () => void) {
  const el = document.querySelector(`#${id}`);
  const { top } = el.getBoundingClientRect();
  smoothScrollTo(window.scrollY + top - document.querySelector(`.${headerStyles.root}`).clientHeight, callback);
};
