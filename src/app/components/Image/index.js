import React from 'react';
import cx from 'classnames';

import styles from './styles.styl';


type Props = {
  className: string,
  aspectRatio: number,
  src: string,
  alt: string,
};

const Image = ({ className, aspectRatio, src, alt, ...props }: Props) => (
  <div className={styles.root}>
    <div className={styles.wrapper} style={{ paddingBottom: `${1 / aspectRatio * 100}%` }}>
      <img className={cx(styles.image, className)} src={src} alt={alt} {...props} />
    </div>
  </div>
);

export default Image;
