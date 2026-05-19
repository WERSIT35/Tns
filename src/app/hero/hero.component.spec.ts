import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('creates with a single h1 and both CTAs', () => {
    expect(fixture.componentInstance).toBeTruthy();
    const root = fixture.nativeElement as HTMLElement;
    const h1s = root.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
    expect(root.querySelector('a.btn--primary')).toBeTruthy();
    expect(root.querySelector('a.btn--ghost')).toBeTruthy();
  });

  it('renders 6 category chips with icons', () => {
    const chips = (fixture.nativeElement as HTMLElement).querySelectorAll('.cat-chip');
    expect(chips.length).toBe(6);
    for (const chip of Array.from(chips)) {
      expect(chip.querySelector('app-category-icon svg')).toBeTruthy();
    }
  });

  it('renders 3 stat cards', () => {
    const stats = (fixture.nativeElement as HTMLElement).querySelectorAll('.stat');
    expect(stats.length).toBe(3);
  });
});
