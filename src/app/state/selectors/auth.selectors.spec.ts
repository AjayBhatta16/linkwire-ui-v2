import { authFeature } from '../features/auth.feature';

describe('Auth Selectors', () => {
  it('should select loggedIn from auth state', () => {
    const selected = authFeature.selectLoggedIn.projector({ loggedIn: true, token: 't' });

    expect(selected).toBe(true);
  });

  it('should select token from auth state', () => {
    const selected = authFeature.selectToken.projector({ loggedIn: true, token: 't' });

    expect(selected).toBe('t');
  });
});
