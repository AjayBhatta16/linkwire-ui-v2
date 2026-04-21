/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LegacyApiResponse } from '../models/legacy-api-response';
import { User } from '../models/user';

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

  it('should post login credentials to the login endpoint', (done) => {
    const mockResponse: User = {
      username: 'user',
      email: '',
      links: [],
      premiumUser: false,
    }

    service.login('user', 'password').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://linkwire-api-8a04bdoa.uk.gateway.dev/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'user', password: 'password' });
    req.flush(mockResponse);
  });

  it('should post signup data to the signup endpoint', (done) => {
    const mockResponse: User = {
      username: 'user',
      email: '',
      links: [],
      premiumUser: false,
    }

    service.signup('newuser', 'newuser@example.com', 'password123').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://linkwire-api-8a04bdoa.uk.gateway.dev/users/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'newuser', email: 'newuser@example.com', password: 'password123' });
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
