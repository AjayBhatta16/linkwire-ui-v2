import { authLogin, authLogout, authReload } from './auth.actions';

describe('Auth Actions', () => {
  it('should create authLogin action with correct type and payload', () => {
    const action = authLogin({ token: 'abc' });

    expect(action.type).toBe('[Auth] Auth Login');
    expect(action.token).toBe('abc');
  });

  it('should create authLogout action with correct type', () => {
    const action = authLogout();

    expect(action.type).toBe('[Auth] Auth Logout');
    expect((action as any).token).toBeUndefined();
  });

  it('should create authReload action with correct type', () => {
    const action = authReload();

    expect(action.type).toBe('[Auth] Auth Reload');
  });
});
