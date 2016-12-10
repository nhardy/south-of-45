import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { loadScript } from 'redux-scripts-manager';

import field, { fieldShape } from '../field';


@connect(null, { loadScript })
@field()
export default class RecaptchaField extends Component {
  static propTypes = {
    loadScript: PropTypes.func.isRequired,
    field: fieldShape,
  };

  componentDidMount() {
    this.props.loadScript(cb => `https://www.google.com/recaptcha/api.js?onload=${cb}&render=explicit`).then(() => {
      window.grecaptcha.render(findDOMNode(this._node), {
        sitekey: '6LdMFQ0UAAAAAFRPXkMC62Fsee2I1U77bNG06lMn',
        callback: this.verified,
        'expired-callback': this.timeout,
      });
    });
  }

  // @public
  getValue = () => {
    return this.token;
  };

  timeout = () => {
    this.token = null;
  };

  verified = (token) => {
    this.token = token;
    this.props.field.setValue(this.getValue());
  };

  token = null;

  // @public
  checkValidity = () => {
    // return `true`/`false` if the value is valid
    return !!this.token;
  };

  render() {
    return (
      <div>
        <div ref={ref => (this._node = ref)} />
      </div>
    );
  }
}
