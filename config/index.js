export default {
  port: process.env.PORT || 8000,
  siteName: 'nhardy.id.au',
  analytics: {
    trackingId: process.env.ANALYTICS_TRACKING_ID,
  },
  github: {
    username: 'nhardy',
    excludedRepos: [
      48929138,
    ],
  },
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITEKEY,
  },
};
