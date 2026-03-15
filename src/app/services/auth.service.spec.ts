import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { authLogin, authLogout } from '../state/actions/auth.actions';
import { AUTH_TOKEN_KEY, USERNAME_KEY } from '../utils/auth-utils';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let token$ = new BehaviorSubject<string | null>('store-token');
  let storeMock: { select: jest.Mock; dispatch: jest.Mock };

  const createService = () => {
    storeMock = {
      select: jest.fn().mockReturnValue(token$.asObservable()),
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Store, useValue: storeMock },
      ],
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  };

  beforeEach(() => {
    token$ = new BehaviorSubject<string | null>('store-token');
    createService();
  });

  it('should return token from store selector when available', () => {
    expect(service.getAuthToken()).toBe('store-token');
  });

  it('should return token from localStorage when store selector is null', () => {
    token$.next(null);
    localStorage.setItem(AUTH_TOKEN_KEY, 'local-token');

    expect(service.getAuthToken()).toBe('local-token');
  });

  it('should return null when no token exists', () => {
    token$.next(null);
    expect(service.getAuthToken()).toBeNull();
  });

  it('should read username from localStorage', () => {
    localStorage.setItem(USERNAME_KEY, 'user');
    expect(service.getUsername()).toBe('user');
  });

  it('should clear localStorage and dispatch authLogout on logout', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'token');
    localStorage.setItem(USERNAME_KEY, 'user');

    service.logout();

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(USERNAME_KEY)).toBeNull();
    expect(storeMock.dispatch).toHaveBeenCalledWith(authLogout());
  });

  it('should store token/username and dispatch authLogin on login', () => {
    service.login('token-123', 'user');

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('token-123');
    expect(localStorage.getItem(USERNAME_KEY)).toBe('user');
    expect(storeMock.dispatch).toHaveBeenCalledWith(authLogin({ token: 'token-123' }));
  });
});
