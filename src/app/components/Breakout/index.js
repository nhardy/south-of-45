import React from 'react';
import type { Element } from 'react';

import styles from './styles.styl';


const Breakout = ({ children }: { children: Element<*> }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      {children}
    </div>
  </div>
);

export default Breakout;
