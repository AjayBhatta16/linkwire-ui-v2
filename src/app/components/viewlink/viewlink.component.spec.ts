import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ViewLinkComponent } from './viewlink.component';

describe('ViewLinkComponent', () => {
  let component: ViewLinkComponent;
  let fixture: ComponentFixture<ViewLinkComponent>;

  beforeEach(async () => {
    ModuleRegistry.registerModules([AllCommunityModule]);

    await TestBed.configureTestingModule({
      imports: [ ViewLinkComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test-id'
              }
            }
          }
        },
        { provide: Store, useValue: { select: jest.fn(() => of(null)), dispatch: jest.fn() } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
