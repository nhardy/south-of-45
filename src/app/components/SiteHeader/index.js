import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import config from 'app/config';
import { smoothScrollToId } from 'app/lib/scroll';
import throttle from 'app/lib/throttle';
import FontAwesome from 'app/components/FontAwesome';
import styles from './styles.styl';


const EVENTS = [
  'scroll',
  'resize',
];

export default class SiteHeader extends Component {
  static propTypes = {
    threshold: PropTypes.func,
  };

  static defaultProps = {
    threshold: () => window.innerHeight / 3,
  };

  state = {
    scrolled: false,
  };

  componentDidMount() {
    this.update();
    EVENTS.forEach(event => window.addEventListener(event, this.update));
  }

  componentWillUnmount() {
    EVENTS.forEach(event => window.removeEventListener(event, this.update));
    this.update.cancel();
  }

  onClickLink = (e: MouseEvent, id: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };

  update = throttle(() => {
    this.setState({
      scrolled: window.scrollY > this.props.threshold(),
    });
  });

  render() {
    const { scrolled } = this.state;
    return (
      <header id="siteHeader" className={cx(styles.root, { [styles.scrolled]: scrolled })}>
        <div className={cx(styles.wrapper)}>
          <label htmlFor="drawer" className={styles.hamburger}>
            <FontAwesome className="fa-bars" />
          </label>
          <Link to="/" className={styles.siteName}>{config.siteName}</Link>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a className={styles.link} href="/#Heating" onClick={e => this.onClickLink(e, 'Heating')}>Heating</a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="/#Safety" onClick={e => this.onClickLink(e, 'Safety')}>Safety</a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="/#Transport" onClick={e => this.onClickLink(e, 'Transport')}>Transport</a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="/#Quality" onClick={e => this.onClickLink(e, 'Quality')}>Council Influence</a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="/#Data" onClick={e => this.onClickLink(e, 'Data')}>Data Sources</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
