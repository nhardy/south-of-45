import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash-es';


export const formShape = PropTypes.shape({
  checkValidity: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
}).isRequired;

export const _formShape = PropTypes.shape({
  updateField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
}).isRequired;

export default function form() {
  return WrappedComponent => class FormContext extends Component {
    static childContextTypes = {
      form: _formShape,
    };

    _fields = {};

    getChildContext() {
      return {
        form: {
          updateField: this.updateField,
          removeField: this.removeField,
        },
      };
    }

    getData = () => Object.entries(this._fields).reduce((acc, [name, { value }]) => ({
      ...acc,
      [name]: value,
    }), {});

    updateField = (name, data) => {
      this._fields[name] = merge(this._fields[name], data);
    };

    removeField = (name) => {
      delete this._fields[name];
    };

    checkValidity = () => {
      Object.entries(this._fields).forEach(([name, { component }]) => {
        this.updateField(name, component.getValue());
        component.triggerValidation();
      });
      return Object.values(this._fields).every(({ valid }) => valid);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          form={{
            checkValidity: this.checkValidity,
            getData: this.getData,
          }}
        />
      );
    }
  };
}
