import { setRouteError, clearRouteError } from 'app/actions/routeError';


describe('Route Error Action Creators', () => {

  describe('setRouteError', () => {

    it('should create an action with the correct properties', () => {
      expect(setRouteError({ status: 404 })).to.deep.equal({
        type: 'SET_ROUTE_ERROR',
        status: 404,
      });
    });

    it('should use 500 as the default status', () => {
      expect(setRouteError()).to.contain({
        status: 500,
      });
    });

  });

  describe('clearRouteError', () => {

    it('should create an action with the correct properties', () => {
      expect(clearRouteError()).to.deep.equal({
        type: 'CLEAR_ROUTE_ERROR',
      });
    });

  });

});
