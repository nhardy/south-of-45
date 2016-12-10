import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import field, { fieldShape } from '../field';


@field()
export default class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    pattern: PropTypes.string,
    field: fieldShape,
  };

  static defaultProps = {
    required: false,
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
  getValue = () => {
    return this._node.value;
  };

  // @public
  checkValidity = () => {
    // return `true`/`false` if the value is valid
    return this._node.checkValidity();
  };

  render() {
    const { name, pattern, required, field: { valid, invalid } } = this.props;

    return (
      <input
        ref={ref => (this._node = ref)}
        name={name}
        className={cx({ valid, invalid })}
        type="text"
        pattern={pattern}
        required={required}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus} />
    );
  }
}
