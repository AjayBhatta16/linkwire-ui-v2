import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LinkRendererComponent } from './link-renderer.component';

describe('LinkRendererComponent', () => {
  let component: LinkRendererComponent;
  let fixture: ComponentFixture<LinkRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LinkRendererComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRendererComponent);
    component = fixture.componentInstance;
    component.agInit({
      displayText: 'Test Link',
      routerLink: ['/test', '123'],
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
    expect(component.params.displayText).toBe('Test Link');
    expect(component.params.routerLink).toEqual(['/test', '123']);
  });

  it('should render link with correct text and routerLink', () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Test Link');
    expect(link.getAttribute('ng-reflect-router-link')).toBe('/test,123');
  });
});
