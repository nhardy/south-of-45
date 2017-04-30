// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


const dismissEvents = ['click', 'touchstart'];

export default class SiteHeader extends Component {
  props: {
    className: string,
  };

  static defaultProps = {
    className: undefined,
  };

  componentDidMount() {
    dismissEvents.forEach(type => this._node.addEventListener(type, this.handleDismiss));
  }

  componentWillUnmount() {
    dismissEvents.forEach(type => this._node.removeEventListener(type, this.handleDismiss));
  }

  _node: HTMLDivElement;

  listeners: Array<() => void> = [];

  addListener(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  handleDismiss = () => {
    this.listeners.forEach(l => l());
  };

  render() {
    return (
      <div className={cx(styles.root, this.props.className)} ref={ref => (this._node = ref)} />
    );
  }
}
