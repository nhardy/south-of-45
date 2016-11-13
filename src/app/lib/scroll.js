function timing(frame, start, end, duration) {
  const t = frame / duration;
  return (-end * t * (t - 2)) + start;
}

// eslint-disable-next-line import/prefer-default-export
export function smoothScrollTo(scrollY, callback) {
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
