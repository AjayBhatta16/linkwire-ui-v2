import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LinkService } from './link.service';
import { CreateLinkRequest } from '../models/link';

describe('LinkService', () => {
  let service: LinkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(LinkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create link via POST to /link/create', (done) => {
    const request: CreateLinkRequest = {
      redirectURL: 'https://example.com',
      note: 'note',
    };

    const mockLink = {
      trackingID: 't',
      displayID: 'd',
      redirectURL: 'https://example.com',
      note: 'note',
      useLogin: false,
      createdBy: 'me',
      clicks: [],
    };

    const mockResponse = { data: mockLink, token: undefined };

    service.createLink(request).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/link/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(mockResponse);
  });

  it('should fetch link via GET to /links/:id', (done) => {
    const mockLink = {
      trackingID: 't',
      displayID: 'd',
      redirectURL: 'https://example.com',
      note: 'note',
      useLogin: false,
      createdBy: 'me',
      clicks: [],
    };

    const mockResponse = { data: mockLink, token: undefined };

    service.fetchLink('abc').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('https://linkwire.cc/links/abc');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
