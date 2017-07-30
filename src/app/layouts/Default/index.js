import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import cx from 'classnames';

import SiteHeader from 'app/components/SiteHeader';
import Drawer from 'app/components/Drawer';
import Overlay from 'app/components/Overlay';
import Parallax from 'app/components/Parallax';
import SiteFooter from 'app/components/SiteFooter';
import hero from 'app/assets/images/secondary-hero.jpg';
import hero2x from 'app/assets/images/secondary-hero-2x.jpg';
import styles from './styles.styl';


export default class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
  };

  componentDidMount() {
    this.detachOverlay = this._overlay.addListener(() => {
      this._checkbox.checked = false;
    });
  }

  componentWillUnmount() {
    this.detachOverlay && this.detachOverlay();
  }

  calculateScrollThreshold = () => findDOMNode(this._parallax).clientHeight - (2 * findDOMNode(this._header).clientHeight);

  render() {
    return (
      <div className={styles.root}>
        <SiteHeader ref={ref => (this._header = ref)} threshold={this.calculateScrollThreshold} />
        <input ref={ref => (this._checkbox = ref)} className={styles.checkbox} id="drawer" type="checkbox" />
        <Drawer className={styles.drawer} />
        <Overlay ref={ref => (this._overlay = ref)} className={styles.overlay} />
        <Parallax
          ref={ref => (this._parallax = ref)}
          className={styles.parallax}
          src={hero}
          srcSet={`${hero} 1x, ${hero2x} 2x`}
          alt="Dunedin, New Zealand"
        >
          <div className={styles.inner}>
            <span className={styles.name}><Link to="/">South of 45</Link></span>
            <span className={styles.tagline}>A Visual Essay</span>
          </div>
        </Parallax>
        <main className={cx(styles.main, this.props.className)}>
          {this.props.children}
        </main>
        <SiteFooter />
      </div>
    );
  }
}
