import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { UserService } from '../../services/user.service';
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

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userServiceMock: {
    login: jest.Mock;
    signup: jest.Mock;
    refreshUserData: jest.Mock;
  };

  beforeEach(() => {
    userServiceMock = {
      login: jest.fn(),
      signup: jest.fn(),
      refreshUserData: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceMock },
      ],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should dispatch userLoginSuccess when login succeeds', async () => {
    const userInfo = { username: 'u', email: 'e', premiumUser: false, links: [] };
    userServiceMock.login.mockReturnValue(of({ data: userInfo }));

    actions$ = of(userLogin({ username: 'u', password: 'p' }));

    const result = await firstValueFrom(effects.login$);
    expect(result).toEqual(userLoginSuccess({ userInfo }));
  });

  it('should dispatch userLoginFailure when login fails', async () => {
    const error = new Error('fail');
    userServiceMock.login.mockReturnValue(throwError(() => error));

    actions$ = of(userLogin({ username: 'u', password: 'p' }));

    const result = await firstValueFrom(effects.login$);
    expect(result).toEqual(userLoginFailure({ error }));
  });

  it('should dispatch userSignupSuccess when signup succeeds', async () => {
    const userInfo = { username: 'u', email: 'e', premiumUser: false, links: [] };
    userServiceMock.signup.mockReturnValue(of({ data: userInfo }));

    actions$ = of(userSignup({ username: 'u', email: 'e', password: 'p' }));

    const result = await firstValueFrom(effects.signup$);
    expect(result).toEqual(userSignupSuccess({ userInfo }));
  });

  it('should dispatch userSignupFailure when signup fails', async () => {
    const error = new Error('fail');
    userServiceMock.signup.mockReturnValue(throwError(() => error));

    actions$ = of(userSignup({ username: 'u', email: 'e', password: 'p' }));

    const result = await firstValueFrom(effects.signup$);
    expect(result).toEqual(userSignupFailure({ error }));
  });

  it('should dispatch userDataRefreshSuccess when refresh succeeds', async () => {
    const userInfo = { username: 'u', email: 'e', premiumUser: false, links: [] };
    userServiceMock.refreshUserData.mockReturnValue(of({ data: userInfo }));

    actions$ = of(userDataRefreshRequest({ username: 'u' }));

    const result = await firstValueFrom(effects.refreshUserData$);
    expect(result).toEqual(userDataRefreshSuccess({ userInfo }));
  });

  it('should dispatch userDataRefreshFailure when refresh fails', async () => {
    const error = new Error('fail');
    userServiceMock.refreshUserData.mockReturnValue(throwError(() => error));

    actions$ = of(userDataRefreshRequest({ username: 'u' }));

    const result = await firstValueFrom(effects.refreshUserData$);
    expect(result).toEqual(userDataRefreshFailure({ error }));
  });
});
