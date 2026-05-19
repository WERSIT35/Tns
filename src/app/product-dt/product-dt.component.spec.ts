import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ProductDtComponent } from './product-dt.component';

describe('ProductDtComponent', () => {
  let fixture: ComponentFixture<ProductDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDtComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductDtComponent);
    fixture.detectChanges();
  });

  it('creates and resolves the requested product', () => {
    const cmp = fixture.componentInstance;
    expect(cmp).toBeTruthy();
    expect(cmp.product()?.id).toBe(1);
  });

  it('substitutes {{volt}} and {{watt}} in description', () => {
    const cmp = fixture.componentInstance;
    const text = cmp.descriptionText();
    expect(text).not.toContain('{{volt}}');
    expect(text).not.toContain('{{watt}}');
  });
});
