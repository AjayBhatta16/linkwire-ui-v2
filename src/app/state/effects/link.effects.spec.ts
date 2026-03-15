import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { LinkEffects } from './link.effects';
import { LinkService } from '../../services/link.service';
import {
  createLink,
  createLinkSuccess,
  createLinkFailure,
  fetchLinkDetails,
  fetchLinkDetailsSuccess,
  fetchLinkDetailsFailure,
} from '../actions/link.actions';

describe('LinkEffects', () => {
  let actions$: Observable<any>;
  let effects: LinkEffects;
  let linkServiceMock: {
    createLink: jest.Mock;
    fetchLink: jest.Mock;
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

  beforeEach(() => {
    linkServiceMock = {
      createLink: jest.fn(),
      fetchLink: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        LinkEffects,
        provideMockActions(() => actions$),
        { provide: LinkService, useValue: linkServiceMock },
      ],
    });

    effects = TestBed.inject(LinkEffects);
  });

  it('should dispatch createLinkSuccess when createLink succeeds', async () => {
    linkServiceMock.createLink.mockReturnValue(of({ data: sampleLink }));

    actions$ = of(createLink({ link: { redirectURL: 'a', note: 'b' } }));

    const result = await firstValueFrom(effects.createLink$);
    expect(result).toEqual(createLinkSuccess({ link: sampleLink }));
  });

  it('should dispatch createLinkFailure when createLink fails', async () => {
    const error = new Error('fail');
    linkServiceMock.createLink.mockReturnValue(throwError(() => error));

    actions$ = of(createLink({ link: { redirectURL: 'a', note: 'b' } }));

    const result = await firstValueFrom(effects.createLink$);
    expect(result).toEqual(createLinkFailure({ error }));
  });

  it('should dispatch fetchLinkDetailsSuccess when fetchLinkDetails succeeds', async () => {
    linkServiceMock.fetchLink.mockReturnValue(of({ data: sampleLink }));

    actions$ = of(fetchLinkDetails({ linkId: '123' }));

    const result = await firstValueFrom(effects.fetchLink$);
    expect(result).toEqual(fetchLinkDetailsSuccess({ link: sampleLink }));
  });

  it('should dispatch fetchLinkDetailsFailure when fetchLinkDetails fails', async () => {
    const error = new Error('fail');
    linkServiceMock.fetchLink.mockReturnValue(throwError(() => error));

    actions$ = of(fetchLinkDetails({ linkId: '123' }));

    const result = await firstValueFrom(effects.fetchLink$);
    expect(result).toEqual(fetchLinkDetailsFailure({ error }));
  });
});
