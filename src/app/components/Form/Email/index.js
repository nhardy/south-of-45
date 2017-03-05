import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import field, { fieldShape } from '../field';
import styles from '../styles.styl';


@field()
export default class EmailField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    required: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
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
    const { name, id, required, placeholder, field: { valid, invalid } } = this.props;

    return (
      <input
        ref={ref => (this._node = ref)}
        name={name}
        id={id}
        className={cx(styles.input, { valid, invalid })}
        type="email"
        required={required}
        placeholder={'e.g. you@example.org' || placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus} />
    );
  }
}
