import { TestBed } from '@angular/core/testing';
import { of, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ViewLinkFacade } from './viewlink.facade';
import { fetchLinkDetails } from '../../state/actions/link.actions';
import { selectAccessUri, selectClicks, selectLink } from '../../state/selectors/link.selectors';

describe('ViewLinkFacade', () => {
  let facade: ViewLinkFacade;
  let storeMock: { select: jest.Mock; dispatch: jest.Mock };

  beforeEach(() => {
    storeMock = {
      select: jest.fn().mockReturnValue(of('mock')),
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ViewLinkFacade,
        { provide: Store, useValue: storeMock },
      ],
    });

    facade = TestBed.inject(ViewLinkFacade);
  });

  it('should select clicks, link and accessUri from the store', async () => {
    expect(storeMock.select).toHaveBeenCalledWith(selectClicks);
    expect(storeMock.select).toHaveBeenCalledWith(selectLink);
    expect(storeMock.select).toHaveBeenCalledWith(selectAccessUri);

    expect(await firstValueFrom(facade.clicks$)).toBe('mock');
    expect(await firstValueFrom(facade.link$)).toBe('mock');
    expect(await firstValueFrom(facade.accessUri$)).toBe('mock');
  });

  it('should dispatch fetchLinkDetails action when fetchLinkDetails is called', () => {
    facade.fetchLinkDetails('abc');
    expect(storeMock.dispatch).toHaveBeenCalledWith(fetchLinkDetails({ linkId: 'abc' }));
  });
});
