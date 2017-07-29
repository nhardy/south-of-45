// @flow

import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import styles from './styles.styl';


const Drawer = ({ className }: { className: string }) => (
  <aside className={cx(styles.root, className)}>
    <label className={styles.close} htmlFor="drawer">
      <FontAwesome className="fa-close" />
    </label>
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
      <ul>
        <li><a href="/github" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </nav>
  </aside>
);

export default Drawer;
