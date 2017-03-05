import qs from 'querystring';

import nodemailer from 'nodemailer';

import { checkStatus } from 'app/lib/fetch';


export default function contactHandler(req, res, next) {
  const { name, email, subject, message, captcha } = req.body;

  if (!name) {
    const error = new Error('"name" may not be empty');
    error.status = 400;
    next(error);
    return;
  }
  if (!email) {
    const error = new Error('"email" may not be empty');
    error.status = 400;
    next(error);
    return;
  }
  if (!subject) {
    const error = new Error('"subject" may not be empty');
    error.status = 400;
    next(error);
    return;
  }
  if (!message) {
    const error = new Error('"message" may not be empty');
    error.status = 400;
    next(error);
    return;
  }

  fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      secret: process.env.RECAPTCHA_SECRET,
      response: captcha,
      remoteip: req.ip,
    }),
  })
    .then(checkStatus)
    .then(raw => raw.json())
    .then((response) => {
      if (!response.success) {
        const error = new Error(`The following errors occurred when verifying the captcha: ${response['error-codes']}`);
        error.status = 400;
        throw error;
      }

      const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail',
      });
      transporter.sendMail({
        from: `${name} <noreply@nhardy.id.au>`,
        to: process.env.CONTACT_EMAIL,
        replyTo: `${name} <${email}>`,
        subject,
        text: `Message forwarded on behalf of ${name} <${email}>.\n\n${message}`,
      }, (err) => {
        if (err) {
          const error = new Error('An error occurred sending the e-mail');
          error.status = 500;
          next(error);
          return;
        }

        res.send({
          success: true,
        });
      });
    })
    .catch((error) => {
      next(error);
    });
}
