import { userFeature, initialUserState } from './user.feature';
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
} from '../actions/user.actions';
import { createLinkSuccess } from '../actions/link.actions';

const sampleUser = {
  username: 'u',
  email: 'e',
  premiumUser: false,
  links: [],
};

const sampleLink = {
  trackingID: 't',
  displayID: 'd',
  redirectURL: 'https://example.com',
  note: 'note',
  useLogin: false,
  createdBy: 'user',
  clicks: [],
};

describe('User Feature Reducer', () => {
  it('should set loading true on userLogin', () => {
    const nextState = userFeature.reducer(initialUserState, userLogin({ username: 'u', password: 'p' }));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set user on userLoginSuccess', () => {
    const nextState = userFeature.reducer(initialUserState, userLoginSuccess({ userInfo: sampleUser as any }));

    expect(nextState.user).toBe(sampleUser);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should set error on userLoginFailure', () => {
    const error = 'fail';
    const nextState = userFeature.reducer(initialUserState, userLoginFailure({ error }));

    expect(nextState.error).toBe(error);
    expect(nextState.loading).toBe(false);
  });

  it('should set loading true on userSignup', () => {
    const nextState = userFeature.reducer(initialUserState, userSignup({ username: 'u', email: 'e', password: 'p' }));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set user on userSignupSuccess', () => {
    const nextState = userFeature.reducer(initialUserState, userSignupSuccess({ userInfo: sampleUser as any }));

    expect(nextState.user).toBe(sampleUser);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should set error on userSignupFailure', () => {
    const error = 'fail';
    const nextState = userFeature.reducer(initialUserState, userSignupFailure({ error }));

    expect(nextState.error).toBe(error);
    expect(nextState.loading).toBe(false);
  });

  it('should append link to user links on createLinkSuccess when user exists', () => {
    const stateWithUser = { ...initialUserState, user: { ...sampleUser, links: [] } };
    const nextState = userFeature.reducer(stateWithUser, createLinkSuccess({ link: sampleLink as any }));

    expect(nextState.user).toEqual({
      ...sampleUser,
      links: [sampleLink],
    });
  });

  it('should leave user null when createLinkSuccess fires without user', () => {
    const nextState = userFeature.reducer(initialUserState, createLinkSuccess({ link: sampleLink as any }));

    expect(nextState.user).toBeNull();
  });

  it('should set loading true on userDataRefreshRequest', () => {
    const nextState = userFeature.reducer(initialUserState, userDataRefreshRequest({ username: 'u' }));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set user on userDataRefreshSuccess', () => {
    const nextState = userFeature.reducer(initialUserState, userDataRefreshSuccess({ userInfo: sampleUser as any }));

    expect(nextState.user).toBe(sampleUser);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should set error on userDataRefreshFailure', () => {
    const error = 'fail';
    const nextState = userFeature.reducer(initialUserState, userDataRefreshFailure({ error }));

    expect(nextState.error).toBe(error);
    expect(nextState.loading).toBe(false);
  });
});
