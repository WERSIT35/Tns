import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDtComponent } from './product-dt.component';

describe('ProductDtComponent', () => {
  let component: ProductDtComponent;
  let fixture: ComponentFixture<ProductDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
