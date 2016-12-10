import React, { Component } from 'react';
import Helmet from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';
import form, { formShape } from 'app/components/Form/form';
import Text from 'app/components/Form/Text';
import Email from 'app/components/Form/Email';
import Recaptcha from 'app/components/Form/Recaptcha';


@form()
export default class ContactView extends Component {
  static propTypes = {
    form: formShape,
  };

  submit = (e) => {
    e.preventDefault();
    console.log('valid:', this.props.form.checkValidity());
    console.log('data', this.props.form.getData());
  };

  render() {
    return (
      <DefaultLayout>
        <Helmet title="Contact | nhardy.id.au" />
        <form>
          <Text name="name" pattern=".{2,100}" required />
          <Email name="email" required />
          <Text name="subject" pattern=".{3,50}" required />
          <Recaptcha name="captcha" />
          <input type="submit" onClick={this.submit} />
        </form>
      </DefaultLayout>
    );
  }
}
