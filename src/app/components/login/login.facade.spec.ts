import { TestBed } from '@angular/core/testing';
import { of, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginFacade } from './login.facade';
import { userLogin } from '../../state/actions/user.actions';
import { selectError, selectLoading, selectUser } from '../../state/selectors/user.selector';

describe('LoginFacade', () => {
  let facade: LoginFacade;
  let storeMock: { select: jest.Mock; dispatch: jest.Mock };

  beforeEach(() => {
    storeMock = {
      select: jest.fn().mockReturnValue(of('mock')), // return same value for all selectors
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        LoginFacade,
        { provide: Store, useValue: storeMock },
      ],
    });

    facade = TestBed.inject(LoginFacade);
  });

  it('should select loading, error, and user from the store', async () => {
    expect(storeMock.select).toHaveBeenCalledWith(selectLoading);
    expect(storeMock.select).toHaveBeenCalledWith(selectError);
    expect(storeMock.select).toHaveBeenCalledWith(selectUser);

    expect(await firstValueFrom(facade.loading$)).toBe('mock');
    expect(await firstValueFrom(facade.error$)).toBe('mock');
    expect(await firstValueFrom(facade.user$)).toBe('mock');
  });

  it('should dispatch userLogin action when login is called', () => {
    facade.login('user@example.com', 'password');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userLogin({ username: 'user@example.com', password: 'password' })
    );
  });
});
