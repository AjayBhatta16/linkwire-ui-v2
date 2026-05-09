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

  it('should create link via POST to /api/links', (done) => {
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

    service.createLink(request).subscribe((response) => {
      expect(response).toEqual(mockLink);
      done();
    });

    const req = httpMock.expectOne('/api/links');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(mockLink);
  });

  it('should fetch link via GET to /api/links/:id', (done) => {
    const mockLink = {
      trackingID: 't',
      displayID: 'd',
      redirectURL: 'https://example.com',
      note: 'note',
      useLogin: false,
      createdBy: 'me',
      clicks: [],
    };

    service.fetchLink('abc').subscribe((response) => {
      expect(response).toEqual(mockLink);
      done();
    });

    const req = httpMock.expectOne('/api/links/abc');
    expect(req.request.method).toBe('GET');
    req.flush(mockLink);
  });
});
