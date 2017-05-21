// @flow
/* eslint-disable react/prop-types */

import React, { Children, Component } from 'react';
import type { Element } from 'react';
import cx from 'classnames';
import { debounce } from 'lodash-es';

import { isScrolledIntoView } from 'app/lib/dom';
import Icon from 'app/components/Icon';
import spacerImg from 'app/assets/images/spacer-16x10.png';
import styles from './styles.styl';


type DefaultProps = {
  autoplay: false;
  duration: 500,
  interval: 3000,
};

type Props = {
  autoplay: boolean;
  duration: number,
  interval: number,
  children: Element<*>,
};

type State = {
  index: number,
  length: number,
};

export default class Slider extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    autoplay: false,
    duration: 500,
    interval: 3000,
  };

  state = {
    index: 0,
    length: 0,
  };

  componentWillMount() {
    this.setState({ length: Children.count(this.props.children) });
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.activateAutoplay();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ length: Children.count(nextProps.children) });
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.autoplay && this.props.autoplay) {
      this.activateAutoplay();
    } else if (prevProps.autoplay && !this.props.autoplay) {
      this.deactivateAutoplay();
    }
  }

  componentWillUnmount() {
    this.props.autoplay && this.deactivateAutoplay();
  }

  _node: HTMLDivElement;

  _interval: number;

  enableAutoplay = () => {
    window.addEventListener('scroll', this.updateAutoplayOnScroll);
    this.updateAutoplay();
  };

  activateAutoplay = () => {
    this.enableAutoplay();
    this._node.addEventListener('mouseleave', this.enableAutoplay);
    this._node.addEventListener('mouseenter', this.disableAutoplay);
  };

  updateAutoplay = () => {
    if (!isScrolledIntoView(this._node)) {
      this._interval && window.clearInterval(this._interval);
      this._interval = 0;
    } else if (!this._interval) {
      this._interval = window.setInterval(this.next, this.props.interval);
    }
  };

  updateAutoplayOnScroll = debounce(this.updateAutoplay, 250);

  disableAutoplay = () => {
    window.removeEventListener('scroll', this.updateAutoplayOnScroll);
    this.updateAutoplayOnScroll.cancel();
    this._interval && window.clearInterval(this._interval);
    this._interval = 0;
  };

  deactivateAutoplay = () => {
    this._node.removeEventListener('mouseleave', this.enableAutoplay);
    this._node.removeEventListener('mouseenter', this.disableAutoplay);
    this.disableAutoplay();
  };

  previous = () => {
    this.setState({ index: (this.state.length + this.state.index - 1) % this.state.length });
  };

  next = () => {
    this.setState({ index: (this.state.index + 1) % this.state.length });
  };

  goto = (index: number) => {
    this.setState({ index });
  }

  render() {
    const { children, duration } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.inner} ref={(ref: HTMLDivElement) => (this._node = ref)}>
            <button type="button" className={styles.previous} onClick={this.previous}>
              <div className={styles.iconWrapper}>
                <Icon name="chevron-circle-left" className={styles.icon} />
              </div>
            </button>
            <button type="button" className={styles.next} onClick={this.next}>
              <div className={styles.iconWrapper}>
                <Icon name="chevron-circle-right" className={styles.icon} />
              </div>
            </button>
            <div className={styles.slider} style={{ transform: `translateX(${this.state.index * -100}%)`, transitionDuration: `${duration}ms` }}>
              {Children.toArray(children).map(slide => (
                <div className={styles.slide} key={slide.key}>
                  {slide}
                </div>
              ))}
            </div>
            <div className={styles.fader} />
            <div className={styles.pagination}>
              {Children.toArray(children).map((slide, index) => (
                <button key={slide.key} className={cx(styles.dot, { [styles.current]: index === this.state.index })} onClick={() => this.goto(index)} />
              ))}
            </div>
          </div>
          <img className={styles.spacer} src={spacerImg} alt="" role="presentation" />
        </div>
      </div>
    );
  }
}
