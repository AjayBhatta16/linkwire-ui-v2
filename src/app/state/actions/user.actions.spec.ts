import {
  userLogin,
  userLoginSuccess,
  userLoginFailure,
  userSignup,
  userSignupSuccess,
  userSignupFailure,
  userDataRefreshRequest,
  userDataRefreshSuccess,
  userDataRefreshFailure,
} from './user.actions';

describe('User Actions', () => {
  it('should create userLogin action with correct type and payload', () => {
    const action = userLogin({ username: 'u', password: 'p' });

    expect(action.type).toBe('[User] User Login');
    expect(action.username).toBe('u');
    expect(action.password).toBe('p');
  });

  it('should create userLoginSuccess action with correct payload', () => {
    const payload = { username: 'u', email: 'e', premiumUser: false, links: [] };
    const action = userLoginSuccess({ userInfo: payload });

    expect(action.type).toBe('[User] User Login Success');
    expect(action.userInfo).toBe(payload);
  });

  it('should create userLoginFailure action with correct payload', () => {
    const error = new Error('fail');
    const action = userLoginFailure({ error });

    expect(action.type).toBe('[User] User Login Failure');
    expect(action.error).toBe(error);
  });

  it('should create userSignup action with correct type and payload', () => {
    const action = userSignup({ username: 'u', email: 'e', password: 'p' });

    expect(action.type).toBe('[User] User Signup');
    expect(action.username).toBe('u');
    expect(action.email).toBe('e');
    expect(action.password).toBe('p');
  });

  it('should create userSignupSuccess action with correct payload', () => {
    const payload = { username: 'u', email: 'e', premiumUser: false, links: [] };
    const action = userSignupSuccess({ userInfo: payload });

    expect(action.type).toBe('[User] User Signup Success');
    expect(action.userInfo).toBe(payload);
  });

  it('should create userSignupFailure action with correct payload', () => {
    const error = new Error('fail');
    const action = userSignupFailure({ error });

    expect(action.type).toBe('[User] User Signup Failure');
    expect(action.error).toBe(error);
  });

  it('should create userDataRefreshRequest action with correct payload', () => {
    const action = userDataRefreshRequest({ username: 'u' });

    expect(action.type).toBe('[User] User Data Refresh Request');
    expect(action.username).toBe('u');
  });

  it('should create userDataRefreshSuccess action with correct payload', () => {
    const payload = { username: 'u', email: 'e', premiumUser: false, links: [] };
    const action = userDataRefreshSuccess({ userInfo: payload });

    expect(action.type).toBe('[User] User Data Refresh Success');
    expect(action.userInfo).toBe(payload);
  });

  it('should create userDataRefreshFailure action with correct payload', () => {
    const error = new Error('fail');
    const action = userDataRefreshFailure({ error });

    expect(action.type).toBe('[User] User Data Refresh Failure');
    expect(action.error).toBe(error);
  });
});
