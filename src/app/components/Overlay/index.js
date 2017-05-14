// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


type Props = {
  className?: string,
};

const dismissEvents = ['click', 'touchstart'];

export default class SiteHeader extends Component<Props, Props, void> {
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
    // FIXME: Remove when better flow recognition in eslint-plugin-react is merged
    // @see: https://github.com/yannickcr/eslint-plugin-react/issues/1138
    /* eslint-disable react/prop-types */
    return (
      <div className={cx(styles.root, this.props.className)} ref={(ref: HTMLDivElement) => (this._node = ref)} />
    );
  }
}
