import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import cx from 'classnames';
import NProgress from 'nprogress';

import config from 'app/config';
import { checkStatus } from 'app/lib/fetch';
import { makeTitle } from 'app/lib/social';
import DefaultLayout from 'app/layouts/Default';
import form, { formShape } from 'app/components/Form/form';
import Text from 'app/components/Form/Text';
import TextArea from 'app/components/Form/TextArea';
import Email from 'app/components/Form/Email';
import Recaptcha from 'app/components/Form/Recaptcha';
import styles from 'app/components/Form/styles.styl';


const TITLE = 'Contact Me';
const DESCRIPTION = [
  'Get in contact with Sydney-based student and developer, Nathan Hardy.',
  'Leave me a message and I\'ll endeavour to get back to you.',
].join(' ');

@form()
export default class ContactView extends Component {
  static propTypes = {
    form: formShape, // eslint-disable-line react/require-default-props
  };

  state = {
    submitting: false,
    sent: false,
    error: null,
  };

  submit = (e) => {
    e.preventDefault();
    this._submit.blur();

    if (!this.props.form.checkValidity()) {
      // error
      this.setState({
        error: 'Looks like you haven\'t filled out the form correctly. Please check the fields and try again.',
      });
    } else {
      this.setState({
        submitting: true,
        error: null,
      });
      NProgress.start();
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.props.form.getData()),
      })
        .then(checkStatus)
        .then(() => {
          this.setState({
            submitting: false,
            sent: true,
          });
        })
        .catch((error) => {
          this.setState({
            submitting: false,
            error: `An Error occurred when sending your message: ${error.message}. Please try again later.`,
          });
          this._captcha.reset();
        })
        .then(() => NProgress.done());
    }
  };

  reset = (e) => {
    e.preventDefault();
    this.setState({
      submitting: false,
      sent: false,
      error: null,
    });
  }

  render() {
    const { submitting, sent } = this.state;
    return (
      <DefaultLayout>
        <Helmet>
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:title" content={makeTitle(TITLE)} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={config.twitter.handle} />
          <meta name="twitter:title" content={makeTitle(TITLE)} />
          <meta name="twitter:description" content={DESCRIPTION} />
        </Helmet>
        {!sent ? (
          <form className={styles.form}>
            <h1>Contact Me</h1>
            <label className={styles.label} htmlFor="contact-name">Name</label>
            <Text name="name" id="contact-name" pattern=".{2,100}" required placeholder="e.g. John Smith" />
            <label className={styles.label} htmlFor="contact-email">Email</label>
            <Email name="email" id="contact-email" required />
            <label className={styles.label} htmlFor="contact-subject">Subject</label>
            <Text name="subject" id="contact-subject" pattern=".{3,50}" required placeholder="e.g. Résumé" />
            <label className={styles.label} htmlFor="contact-message">Message</label>
            <TextArea name="message" id="contact-message" required placeholder="Type your message..." />
            <Recaptcha withRef={ref => (this._captcha = ref)} name="captcha" />
            <div className={cx(styles.errors, { [styles.hidden]: !this.state.error })}>
              {this.state.error}
            </div>
            <button
              ref={ref => (this._submit = ref)}
              className={styles.button}
              onClick={this.submit}
              disabled={submitting}
            >
              {submitting ? (
                <span>Sending...</span>
              ) : (
                <span>Send&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </button>
          </form>
        ) : (
          <div className={styles.styl}>
            <h1>Thanks for your message!</h1>
            <p>I&apos;ll be in touch soon.</p>
            <p>Send <a href="" onClick={this.reset}>another</a>?</p>
          </div>
        )}

      </DefaultLayout>
    );
  }
}
