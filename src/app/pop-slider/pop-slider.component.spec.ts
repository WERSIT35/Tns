import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PopSliderComponent } from './pop-slider.component';

describe('PopSliderComponent', () => {
  let fixture: ComponentFixture<PopSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopSliderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PopSliderComponent);
    fixture.detectChanges();
  });

  it('creates with featured items', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.popularList.length).toBeGreaterThan(0);
  });
});
