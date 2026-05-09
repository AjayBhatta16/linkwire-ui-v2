/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
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

    const req = httpMock.expectOne('/api/users/login');
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

    const req = httpMock.expectOne('/api/users/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'newuser', email: 'newuser@example.com', password: 'password123' });
    req.flush(mockResponse);
  });

  it('should return refresh user data response as links', (done) => {
    const mockLinks = [
      {
        trackingID: 't',
        displayID: 'd',
        redirectURL: 'https://example.com',
        note: 'note',
        useLogin: false,
        createdBy: 'user',
        clicks: [],
      },
    ];

    service.refreshUserData('user').subscribe((response) => {
      expect(response).toEqual(mockLinks);
      done();
    });

    const req = httpMock.expectOne('/api/username/user/links');
    expect(req.request.method).toBe('GET');
    req.flush(mockLinks);
  });
});
