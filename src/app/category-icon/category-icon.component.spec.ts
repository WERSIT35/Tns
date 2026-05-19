import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryIconComponent } from './category-icon.component';

/**
 * SSR-safety contract for CategoryIconComponent:
 * - it must never bind to the `innerHTML` property on an SVG element
 *   (that triggers NotYetImplemented in @angular/platform-server).
 * - it must render real SVG child nodes through Angular's template renderer,
 *   so that universal + prerender produce correct output.
 */
describe('CategoryIconComponent (SSR-safe rendering)', () => {
  let fixture: ComponentFixture<CategoryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryIconComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CategoryIconComponent);
  });

  function renderWith(category: string): SVGSVGElement {
    fixture.componentRef.setInput('category', category);
    fixture.detectChanges();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg).toBeTruthy();
    return svg as unknown as SVGSVGElement;
  }

  it('renders an <svg> element with proper attributes', () => {
    const svg = renderWith('ღუმელის ტენები');
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('uses [attr.width]/[attr.height] (not property writes)', () => {
    fixture.componentRef.setInput('category', 'ღუმელის ტენები');
    fixture.componentRef.setInput('size', 32);
    fixture.detectChanges();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
  });

  it('renders real SVG children (not via innerHTML) for each of the 9 categories', () => {
    const categories = [
      'ღუმელის ტენები',
      'ტოსტერის ტენები',
      'გრილის ტენები',
      'თერმოსტატები',
      'ყავის აპარატის ტენები',
      'სამრეწველო ტენები',
      'წყლის გამაცხელებელი ტენები',
      'სარეცხი მანქანის ტენები',
      'ვენტილაციის ტენები',
    ];
    const seen = new Set<string>();
    for (const cat of categories) {
      const svg = renderWith(cat);
      expect(svg.children.length)
        .withContext(`children for "${cat}"`)
        .toBeGreaterThan(0);
      const signature = Array.from(svg.children)
        .map((n) => n.tagName)
        .join(',');
      expect(signature)
        .withContext(`unique signature for "${cat}"`)
        .not.toBe('');
      seen.add(svg.innerHTML);
    }
    // The 9 categories must produce distinct rendered SVG content.
    expect(seen.size).toBe(9);
  });

  it('falls back to a recognizable shape for unknown categories', () => {
    const svg = renderWith('definitely-not-a-real-category');
    expect(svg.children.length).toBeGreaterThan(0);
    // fallback uses a circle (info-style icon)
    expect(svg.querySelector('circle')).toBeTruthy();
  });
});
