import React from 'react';
import type { Element } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


type Props = {
  children: Element<*>,
  outerClassName: string,
  innerClassName: string,
};

const Breakout = ({ children, outerClassName = '', innerClassName = '' }: Props) => (
  <div className={cx(styles.root, outerClassName)}>
    <div className={cx(styles.inner, innerClassName)}>
      {children}
    </div>
  </div>
);

export default Breakout;
