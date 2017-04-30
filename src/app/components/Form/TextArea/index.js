import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import field, { fieldShape } from '../field';
import styles from '../styles.styl';


@field()
export default class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    pattern: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    field: fieldShape, // eslint-disable-line react/require-default-props
  };

  static defaultProps = {
    id: undefined,
    pattern: undefined,
    required: false,
    placeholder: undefined,
  };

  onChange = () => {
    this.props.field.setValue(this.getValue());
  };

  onBlur = () => {
    this.props.field.triggerValidation();
  };

  onFocus = () => {
    this.props.field.hideValidation();
  };

  // @public
  getValue = () => this._node.value;

  // @public
  checkValidity = () =>
    // return `true`/`false` if the value is valid
     this._node.checkValidity();

  render() {
    const { name, id, pattern, required, placeholder, field: { valid, invalid } } = this.props;

    return (
      <textarea
        ref={ref => (this._node = ref)}
        name={name}
        id={id}
        className={cx(styles.textarea, { valid, invalid })}
        pattern={pattern}
        required={required}
        placeholder={placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}
