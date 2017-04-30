import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import throttle from 'app/lib/throttle';
import { isScrolledIntoView } from 'app/lib/dom';
import styles from './styles.styl';


const EVENTS = [
  'scroll',
  'resize',
];

export default class Parallax extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    alt: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: undefined,
    srcSet: undefined,
    sizes: undefined,
  };

  state = {
    style: {
      perspectiveOrigin: 'center 0px',
    },
  };

  componentDidMount() {
    this.update();
    EVENTS.forEach(event => window.addEventListener(event, this.update));
  }

  componentWillUnmount() {
    EVENTS.forEach(event => window.removeEventListener(event, this.update));
    this.update.cancel();
  }

  update = throttle(() => {
    if (!isScrolledIntoView(this._node)) return;

    const perspectiveOrigin = `center ${window.scrollY}px`;
    this.setState({ style: { perspectiveOrigin } });
  });

  render() {
    const { className, children, src, srcSet, sizes, alt } = this.props;
    return (
      <div ref={ref => (this._node = ref)} className={cx(styles.root, className)} style={this.state.style}>
        <img className={styles.background} src={src} srcSet={srcSet} sizes={sizes} alt={alt} />
        <div className={styles.foreground}>
          {children}
        </div>
      </div>
    );
  }
}
