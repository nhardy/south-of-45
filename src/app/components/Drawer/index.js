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
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/cv">Curriculum Vitæ</Link></li>
      </ul>
      <ul>
        <li><a href="/linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="/github" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><Link to="/contact">Contact Me</Link></li>
      </ul>
    </nav>
  </aside>
);

Drawer.propTypes = {
  className: PropTypes.string,
};

export default Drawer;
