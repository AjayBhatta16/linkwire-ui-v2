import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Clipboard } from '@angular/cdk/clipboard';
import { CopyButtonRendererComponent } from './copy-button-renderer.component';

describe('CopyButtonRendererComponent', () => {
  let component: CopyButtonRendererComponent;
  let fixture: ComponentFixture<CopyButtonRendererComponent>;
  let clipboardMock: jest.Mocked<Clipboard>;

  beforeEach(async () => {
    clipboardMock = {
      copy: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ CopyButtonRendererComponent ],
      providers: [
        { provide: Clipboard, useValue: clipboardMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyButtonRendererComponent);
    component = fixture.componentInstance;
    component.agInit({ textContent: 'test text', valueToCopy: 'copied value', value: 'test', data: {}, node: {} as any, colDef: {} as any, column: {} as any, api: {} as any, context: {} } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set params in agInit', () => {
    expect(component.params.textContent).toBe('test text');
    expect(component.params.valueToCopy).toBe('copied value');
  });

  it('should copy value to clipboard when copyToClipboard is called', () => {
    component.copyToClipboard();
    expect(clipboardMock.copy).toHaveBeenCalledWith('copied value');
  });
});
