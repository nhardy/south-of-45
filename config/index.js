export default {
  port: process.env.PORT || 8000,
  baseUrl: 'http://south-of-45.azurewebsites.net',
  siteName: 'South Of 45',
  analytics: {
    trackingId: process.env.ANALYTICS_TRACKING_ID,
  },
  github: {
    username: 'nhardy',
    repoUrl: process.env.PROJECT_HOMEPAGE,
    excludedRepos: [
      48929138,
    ],
  },
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITEKEY,
  },
  twitter: {
    handle: '@nhardy96',
  },
};
