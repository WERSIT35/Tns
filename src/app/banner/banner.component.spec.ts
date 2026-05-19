import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(BannerComponent);
    fixture.detectChanges();
  });

  it('creates and renders the hero heading', () => {
    expect(fixture.componentInstance).toBeTruthy();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent?.length).toBeGreaterThan(0);
  });
});
