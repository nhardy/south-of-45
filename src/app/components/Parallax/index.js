import React, { Component, PropTypes } from 'react';

import throttle from 'app/lib/throttle';
import { isScrolledIntoView } from 'app/lib/dom';
import hero from 'app/assets/images/hero.jpg';

import styles from './styles.styl';


const EVENTS = [
  'scroll',
  'resize',
];

export default class Parallax extends Component {
  static propTypes = {
    children: PropTypes.node,
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
    return (
      <div ref={ref => (this._node = ref)} className={styles.root} style={this.state.style}>
        <img className={styles.background} src={hero} alt="Flower Macro" />
        <div className={styles.foreground}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
