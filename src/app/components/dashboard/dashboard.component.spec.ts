import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { DashboardComponent } from './dashboard.component';
import { DashboardFacade } from './dashboard.facade';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let facadeMock: jest.Mocked<DashboardFacade>;
  let dialogMock: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    facadeMock = {
      user$: new BehaviorSubject(null),
      links$: new BehaviorSubject([]),
      refreshUserData: jest.fn(),
    } as any;

    dialogMock = {
      open: jest.fn(),
    } as any;

    ModuleRegistry.registerModules([AllCommunityModule]);

    await TestBed.configureTestingModule({
      imports: [ DashboardComponent ],
      providers: [
        { provide: Store, useValue: { select: jest.fn(() => of(null)), dispatch: jest.fn() } },
        { provide: MatDialog, useValue: dialogMock },
      ]
    })
    .compileComponents();

    TestBed.overrideProvider(DashboardFacade, { useValue: facadeMock });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user$ and links$ observables', () => {
    expect(component.user$).toBeDefined();
    expect(component.links$).toBeDefined();
  });

  it('should call refreshUserData on init when user is null', () => {
    expect(facadeMock.refreshUserData).toHaveBeenCalled();
  });

  it('should open add link dialog when handleAddLink is called', () => {
    component.handleAddLink();
    expect(dialogMock.open).toHaveBeenCalled();
  });
});
