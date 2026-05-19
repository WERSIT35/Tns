import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
  });

  it('creates with a non-empty default category', () => {
    const cmp = fixture.componentInstance;
    expect(cmp.selectedItems().length).toBeGreaterThan(0);
  });

  it('switches category when selectCategory is called', () => {
    const cmp = fixture.componentInstance;
    const first = cmp.selectedItems();
    cmp.selectCategory(1);
    const second = cmp.selectedItems();
    expect(second).not.toBe(first);
  });
});
