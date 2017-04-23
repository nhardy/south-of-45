import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { loadScript } from 'redux-scripts-manager';

import config from 'app/config';
import field, { fieldShape } from '../field';
import styles from './styles.styl';


@connect(null, { loadScript })
@field()
export default class RecaptchaField extends Component {
  static propTypes = {
    loadScript: PropTypes.func.isRequired,
    field: fieldShape, // eslint-disable-line react/require-default-props
  };

  componentDidMount() {
    this.props.loadScript(cb => `https://www.google.com/recaptcha/api.js?onload=${cb}&render=explicit`).then(() => {
      this.widgetId = window.grecaptcha.render(findDOMNode(this._node), {
        sitekey: config.recaptcha.siteKey,
        callback: this.verified,
        'expired-callback': this.timeout,
      });
    });
  }

  // @public
  getValue = () => this.token;

  timeout = () => {
    this.token = null;
  };

  verified = (token) => {
    this.token = token;
    this.props.field.setValue(this.getValue());
  };

  token = null;

  // @public
  checkValidity = () =>
    // return `true`/`false` if the value is valid
     !!this.token;

  widgetId = null;

  reset = () => {
    window.grecaptcha && window.grecaptcha.reset(this.widgetId);
  };

  render() {
    return (
      <div className={styles.root}>
        <div ref={ref => (this._node = ref)} />
      </div>
    );
  }
}
