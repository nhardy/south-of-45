import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import styles from './styles.styl';


const SiteFooter = () => (
  <footer className={styles.root}>
    <div className={styles.column}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.social}>
            <a href="/linkedin" target="_blank" rel="noopener noreferrer">
              <FontAwesome className="fa-linkedin-square" />
            </a>
            <a href="/github" target="_blank" rel="noopener noreferrer">
              <FontAwesome className="fa-github" />
            </a>
            <Link to="/contact">
              <FontAwesome className="fa-at" />
            </Link>
          </div>
        </div>
        <div className={styles.info}>
          Web Development by <Link to="/">Nathan Hardy</Link>.
        </div>
        <div className={cx(styles.info, styles.copyright)}>
          <span>&copy; {(new Date()).getFullYear()} Nathan Hardy</span>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
