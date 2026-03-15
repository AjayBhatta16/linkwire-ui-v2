import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LegacyApiResponse } from '../models/legacy-api-response';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let authMock: { login: jest.Mock };

  beforeEach(() => {
    authMock = { login: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authMock }],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call authService.login when login response contains token', (done) => {
    const mockResponse: LegacyApiResponse<any> = {
      data: { username: 'user' },
      token: 'token',
    };

    service.login('user', 'pass').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(authMock.login).toHaveBeenCalledWith('token', 'user');
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/user/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', password: 'pass' });
    req.flush(mockResponse);
  });

  it('should not call authService.login when login response has no token', (done) => {
    const mockResponse: LegacyApiResponse<any> = {
      data: { username: 'user' },
      token: undefined,
    };

    service.login('user', 'pass').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(authMock.login).not.toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/user/verify');
    req.flush(mockResponse);
  });

  it('should call authService.login when signup response contains token', (done) => {
    const mockResponse: LegacyApiResponse<any> = {
      data: { username: 'user' },
      token: 'token',
    };

    service.signup('user', 'user@example.com', 'pass').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(authMock.login).toHaveBeenCalledWith('token', 'user');
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/user/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', email: 'user@example.com', password: 'pass' });
    req.flush(mockResponse);
  });

  it('should return refresh user data response', (done) => {
    const mockResponse: LegacyApiResponse<any> = {
      data: { username: 'user' },
      token: undefined,
    };

    service.refreshUserData('user').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/user/info');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user' });
    req.flush(mockResponse);
  });
});
