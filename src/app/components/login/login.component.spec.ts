import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { Validators } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginFacade } from './login.facade';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let facadeMock: jest.Mocked<LoginFacade>;
  let router: Router;

  beforeEach(async () => {
    facadeMock = {
      user$: new BehaviorSubject(null),
      loading$: new BehaviorSubject(false),
      error$: new BehaviorSubject(null),
      login: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ LoginComponent, RouterTestingModule ],
      providers: [
        { provide: Store, useValue: { select: jest.fn(() => of(null)), dispatch: jest.fn() } },
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
    .compileComponents();

    TestBed.overrideProvider(LoginFacade, { useValue: facadeMock });

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required validators', () => {
    expect(component.form.get('username')?.invalid).toBe(true);
    expect(component.form.get('password')?.invalid).toBe(true);
  });

  it('should show validation error for empty username', () => {
    component.form.get('username')?.setValue('');
    component.form.get('password')?.setValue('password');
    component.onSubmit();
    expect(component.validationErrorSubject.value).toBe('Username/E-Mail is required.');
  });

  it('should show validation error for empty password', () => {
    component.form.get('username')?.setValue('user');
    component.form.get('password')?.setValue('');
    component.onSubmit();
    expect(component.validationErrorSubject.value).toBe('Password is required.');
  });

  it('should call facade login with correct values', () => {
    component.form.get('username')?.setValue('user@example.com');
    component.form.get('password')?.setValue('password');
    component.onSubmit();
    expect(facadeMock.login).toHaveBeenCalledWith('user@example.com', 'password');
  });

  it('should navigate to dashboard when user is logged in', () => {
    facadeMock.user$.next({ id: 1 });
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
