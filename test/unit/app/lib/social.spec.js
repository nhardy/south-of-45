const appConfig = {
  baseUrl: 'https://www.example.org',
  siteName: 'The Site',
};

const {
  makeTitle,
  makeAbsoluteUrl,
} = proxyquire('app/lib/social', {
  'app/config': appConfig,
});

describe('Social Lib Utils', () => {

  describe('makeTitle', () => {
    const title = 'Page Name';

    it('should add the correct suffix', () => {
      expect(makeTitle(title)).to.equal(`${title} | ${appConfig.siteName}`);
    });

  });

  describe('makeAbsoluteUrl', () => {

    it('should prefix a standard url with the baseUrl from the appConfig', () => {
      const path = '/image.jpg';
      expect(makeAbsoluteUrl(path)).to.equal(`${appConfig.baseUrl}${path}`);
    });

    context('when the url is a data-uri', () => {
      const path = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=';

      it('should leave the data-uri untouched', () => {
        expect(makeAbsoluteUrl(path)).to.equal(path);
      });

    });

  });

});
