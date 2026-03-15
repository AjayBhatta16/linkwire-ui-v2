import { authFeature, initialAuthState } from './auth.feature';
import { authLogin, authLogout, authReload } from '../actions/auth.actions';

describe('Auth Feature Reducer', () => {
  it('should set loggedIn and token on authLogin', () => {
    const nextState = authFeature.reducer(initialAuthState, authLogin({ token: 'tok' }));

    expect(nextState.loggedIn).toBe(true);
    expect(nextState.token).toBe('tok');
  });

  it('should reset login and token on authLogout', () => {
    const loggedInState = { loggedIn: true, token: 'tok' };
    const nextState = authFeature.reducer(loggedInState, authLogout());

    expect(nextState.loggedIn).toBe(false);
    expect(nextState.token).toBeNull();
  });

  describe('authReload', () => {
    let getItemSpy: jest.SpyInstance;

    afterEach(() => {
      getItemSpy.mockRestore();
    });

    it('should set loggedIn true when token exists in localStorage', () => {
      getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('token123');

      const nextState = authFeature.reducer(initialAuthState, authReload());

      expect(nextState.loggedIn).toBe(true);
      expect(nextState.token).toBe('token123');
    });

    it('should set loggedIn false when token does not exist in localStorage', () => {
      getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

      const nextState = authFeature.reducer({ loggedIn: true, token: 'token123' }, authReload());

      expect(nextState.loggedIn).toBe(false);
      expect(nextState.token).toBeNull();
    });
  });
});
