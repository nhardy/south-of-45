import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


const Drawer = ({ className }) => (
  <aside className={cx(styles.root, className)}>
    <label className={styles.close} htmlFor="drawer">
      <FontAwesome className="fa-close" />
    </label>
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/test">Test Error</Link></li>
      </ul>
      <ul>
        <li><Link to="/linkedin">LinkedIn</Link></li>
        <li><a href="https://github.com/nhardy" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </aside>
);

Drawer.propTypes = {
  className: PropTypes.string,
};

export default Drawer;
