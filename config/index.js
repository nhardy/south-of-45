export default {
  port: process.env.PORT || 8000,
  siteName: 'nhardy.id.au',
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITEKEY || '6LdMFQ0UAAAAAFRPXkMC62Fsee2I1U77bNG06lMn',
  },
};
