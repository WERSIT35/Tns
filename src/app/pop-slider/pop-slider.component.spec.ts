import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopSliderComponent } from './pop-slider.component';

describe('PopSliderComponent', () => {
  let component: PopSliderComponent;
  let fixture: ComponentFixture<PopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
