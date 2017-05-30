// @flow
/* eslint-disable react/prop-types */

import React, { Children, Component, cloneElement } from 'react';
import type { Element } from 'react';
import cx from 'classnames';

import timeout from 'app/lib/timeout';
import FontAwesome from 'app/components/FontAwesome';
import styles from './styles.styl';


type DefaultProps = {
  duration: 500,
};

type Props = {
  duration: number,
  children: Element<*>,
};

type State = {
  index: number,
  length: number,
  completed: number,
  loading: boolean;
};

export default class SlidingStages extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    duration: 500,
  };

  state = {
    index: 0,
    length: 0,
    completed: 0,
    loading: false,
  };

  componentWillMount() {
    this.setState({ length: Children.count(this.props.children) });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ length: Children.count(nextProps.children) });
  }

  back = async () => {
    this.setState({ index: (this.state.length + this.state.index - 1) % this.state.length });

    await timeout(this.props.duration);
  };

  forward = async () => {
    this.setState({ index: (this.state.index + 1) % this.state.length });

    await timeout(this.props.duration);
  };

  complete = async (index: number, wait?: Promise<void>) => {
    this.setState({ loading: true });

    await Promise.all([
      Promise.resolve(wait),
      timeout(this.props.duration),
    ]);

    this.setState({
      completed: Math.max(this.state.completed, index + 1),
      loading: false,
    });
    this.forward();
    await timeout(this.props.duration);
  };

  goto = async (index: number) => {
    this.setState({ index });

    await timeout(this.props.duration);
  };

  render() {
    const { duration, children } = this.props;
    const { index, length, completed, loading } = this.state;
    return (
      <div className={styles.root}>
        <div className={cx(styles.controls, styles.blur, { [styles.blurred]: loading })}>
          <button className={styles.back} onClick={this.back} disabled={index === 0}>
            Back
          </button>
          <button className={styles.forward} onClick={this.forward} disabled={index === length - 1 || index + 1 > completed}>
            Forward
          </button>
        </div>
        <div
          className={cx(styles.slider, styles.blur, { [styles.blurred]: loading })}
          style={{
            transform: `translateX(${index * -100}%)`,
            transition: `transform ${duration}ms ease-in-out, filter 250ms ease-in-out`,
          }}
        >
          {Children.toArray(children).map((stage, i) => (
            <div key={stage.key} className={styles.stage}>
              {cloneElement(stage, { complete: (wait?: Promise<void>) => this.complete(i, wait) })}
            </div>
          ))}
        </div>
        <div className={cx(styles.pagination, styles.blur, { [styles.blurred]: loading })}>
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
        <div className={cx(styles.loader, { [styles.loading]: loading })}>
          <FontAwesome className={cx('fa-cog', 'fa-spin', { [styles.hidden]: !loading })} />
        </div>
      </div>
    );
  }
}
