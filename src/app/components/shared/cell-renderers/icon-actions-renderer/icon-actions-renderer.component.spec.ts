import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconActionsRendererComponent } from './icon-actions-renderer.component';

describe('IconActionsRendererComponent', () => {
  let component: IconActionsRendererComponent;
  let fixture: ComponentFixture<IconActionsRendererComponent>;
  let mockOnClick: jest.Mock;

  beforeEach(async () => {
    mockOnClick = jest.fn();

    await TestBed.configureTestingModule({
      imports: [ IconActionsRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconActionsRendererComponent);
    component = fixture.componentInstance;
    component.agInit({
      actions: [{ iconClass: 'fa-edit', onClick: mockOnClick }],
      value: 'test',
      data: {},
      node: {} as any,
      colDef: {} as any,
      column: {} as any,
      api: {} as any,
      context: {}
    } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set params in agInit', () => {
    expect(component.params.actions).toHaveLength(1);
    expect(component.params.actions[0].iconClass).toBe('fa-edit');
  });

  it('should render action icons', () => {
    const compiled = fixture.nativeElement;
    const icons = compiled.querySelectorAll('i');
    expect(icons).toHaveLength(1);
    expect(icons[0].classList.contains('fa-edit')).toBeTruthy();
  });
});
