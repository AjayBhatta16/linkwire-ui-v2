import { TestBed } from '@angular/core/testing';
import { of, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardFacade } from './dashboard.facade';
import { createLink } from '../../state/actions/link.actions';
import { userDataRefreshRequest } from '../../state/actions/user.actions';
import { selectDisplayLinks, selectUser } from '../../state/selectors/user.selector';
import { selectError, selectLink, selectLoading } from '../../state/selectors/link.selectors';
import { AuthService } from '../../services/auth.service';

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let storeMock: { select: jest.Mock; dispatch: jest.Mock };
  let authMock: { getUsername: jest.Mock };

  beforeEach(() => {
    storeMock = {
      select: jest.fn().mockReturnValue(of('mock')),
      dispatch: jest.fn(),
    };

    authMock = {
      getUsername: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        DashboardFacade,
        { provide: Store, useValue: storeMock },
        { provide: AuthService, useValue: authMock },
      ],
    });

    facade = TestBed.inject(DashboardFacade);
  });

  it('should select user, links and link state from the store', async () => {
    expect(storeMock.select).toHaveBeenCalledWith(selectUser);
    expect(storeMock.select).toHaveBeenCalledWith(selectDisplayLinks);
    expect(storeMock.select).toHaveBeenCalledWith(selectError);
    expect(storeMock.select).toHaveBeenCalledWith(selectLoading);
    expect(storeMock.select).toHaveBeenCalledWith(selectLink);

    expect(await firstValueFrom(facade.user$)).toBe('mock');
    expect(await firstValueFrom(facade.links$)).toBe('mock');
    expect(await firstValueFrom(facade.linkError$)).toBe('mock');
    expect(await firstValueFrom(facade.linkLoading$)).toBe('mock');
    expect(await firstValueFrom(facade.activeLink$)).toBe('mock');
  });

  it('should dispatch createLink action with correct payload', () => {
    facade.createLink('https://example.com', 'hello');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      createLink({ link: { redirectURL: 'https://example.com', note: 'hello' } })
    );
  });

  it('should dispatch userDataRefreshRequest when auth service returns username', () => {
    authMock.getUsername.mockReturnValue('user');

    facade.refreshUserData();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userDataRefreshRequest({ username: 'user' })
    );
  });

  it('should not dispatch userDataRefreshRequest when auth service returns null', () => {
    authMock.getUsername.mockReturnValue(null);

    facade.refreshUserData();

    expect(storeMock.dispatch).not.toHaveBeenCalled();
  });
});
