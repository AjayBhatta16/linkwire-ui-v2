import { TestBed } from '@angular/core/testing';
import { of, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { SignupFacade } from './signup.facade';
import { userSignup } from '../../state/actions/user.actions';
import { selectError, selectLoading, selectUser } from '../../state/selectors/user.selector';

describe('SignupFacade', () => {
  let facade: SignupFacade;
  let storeMock: { select: jest.Mock; dispatch: jest.Mock };

  beforeEach(() => {
    storeMock = {
      select: jest.fn().mockReturnValue(of('mock')),
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        SignupFacade,
        { provide: Store, useValue: storeMock },
      ],
    });

    facade = TestBed.inject(SignupFacade);
  });

  it('should select loading, error, and user from the store', async () => {
    expect(storeMock.select).toHaveBeenCalledWith(selectLoading);
    expect(storeMock.select).toHaveBeenCalledWith(selectError);
    expect(storeMock.select).toHaveBeenCalledWith(selectUser);

    expect(await firstValueFrom(facade.loading$)).toBe('mock');
    expect(await firstValueFrom(facade.error$)).toBe('mock');
    expect(await firstValueFrom(facade.user$)).toBe('mock');
  });

  it('should dispatch userSignup action when signup is called', () => {
    facade.signup('user@example.com', 'password', 'user@example.com');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      userSignup({ username: 'user@example.com', password: 'password', email: 'user@example.com' })
    );
  });
});
