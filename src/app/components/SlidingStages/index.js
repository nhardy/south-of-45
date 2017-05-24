// @flow
/* eslint-disable react/prop-types */

import React, { Children, Component, cloneElement } from 'react';
import type { Element } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


type DefaultProps = {};

type Props = {
  children: Element<*>,
};

type State = {
  index: number,
  length: number,
  completed: number,
};

export default class SlidingStages extends Component<DefaultProps, Props, State> {
  static defaultProps = {

  };

  state = {
    index: 0,
    length: 0,
    completed: 0,
  };

  componentWillMount() {
    this.setState({ length: Children.count(this.props.children) });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ length: Children.count(nextProps.children) });
  }

  back = () => {
    this.setState({ index: (this.state.length + this.state.index - 1) % this.state.length });
  };

  forward = () => {
    this.setState({ index: (this.state.index + 1) % this.state.length });
  };

  complete = (index: number) => {
    this.setState({ completed: Math.max(this.state.completed, index) });
    this.forward();
  };

  goto = (index: number) => {
    this.setState({ index });
  };

  render() {
    const { children } = this.props;
    const { index, length, completed } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.controls}>
          <button className={styles.back} onClick={this.back} disabled={index === 0}>
            Back
          </button>
          <button className={styles.forward} onClick={this.forward} disabled={index === length - 1 || index + 1 > completed}>
            Forward
          </button>
        </div>
        <div className={styles.slider} style={{ transform: `translateX(${index * -100}%)` }}>
          {Children.toArray(children).map((stage, i) => (
            <div key={stage.key} className={styles.stage}>
              {cloneElement(stage, { complete: () => this.complete(i) })}
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {Children.toArray(children).map((stage, i) => (
            <button
              key={stage.key}
              type="button"
              className={cx(styles.dot, { [styles.current]: i === index })}
              onClick={() => this.goto(i)}
              disabled={i > completed}
            />
          ))}
        </div>
      </div>
    );
  }
}
