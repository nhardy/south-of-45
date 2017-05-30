// @flow
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import cx from 'classnames';
import { debounce } from 'lodash-es';

import styles from './styles.styl';


type DefaultProps = {
  ratio: number,
};

type Props = {
  className: string,
  ratio: number,
};

type State = {
  maxDimension: number,
};

export default class Spacer extends PureComponent<DefaultProps, Props, State> {
  static defaultProps = {
    ratio: 16 / 9,
  };

  state = {
    maxDimension: 3840,
  };

  componentDidMount() {
    this.updateMaxDimension();
    window.addEventListener('resize', this.updateMaxDimensionDebounced);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMaxDimensionDebounced);
    this.updateMaxDimensionDebounced.cancel();
  }

  updateMaxDimension = () => {
    this.setState({ maxDimension: Math.max(screen.width, screen.height) });
  };

  updateMaxDimensionDebounced = debounce(this.updateMaxDimension, 250);

  render() {
    const { className, ratio } = this.props;
    const { maxDimension } = this.state;
    const height = ratio > 1 ? maxDimension : Math.round(maxDimension / ratio);
    const width = ratio > 1 ? Math.round(maxDimension * ratio) : maxDimension;

    const encodedSvg = `%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='${width}'%20height='${height}'%20viewBox='0 0 ${width} ${height}'%3E%3C%2Fsvg%3E`;

    return (
      <img className={cx(styles.root, className)} src={`data:image/svg+xml;utf8,${encodedSvg}`} role="presentation" alt="" />
    );
  }
}
