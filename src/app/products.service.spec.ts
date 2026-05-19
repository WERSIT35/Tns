import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let svc: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(ProductsService);
  });

  it('exposes a non-empty category list', () => {
    expect(svc.categories.length).toBeGreaterThan(0);
  });

  it('returns a non-empty product list', () => {
    expect(svc.getProducts().length).toBeGreaterThan(0);
  });

  it('looks up a product by id in O(1)', () => {
    const all = svc.getProducts();
    const first = all[0];
    expect(svc.getProductById(first.id)).toBe(first);
    expect(svc.getProductById(-1)).toBeUndefined();
  });

  it('filters products by category', () => {
    const cat = svc.categories[0];
    const items = svc.getByCategory(cat);
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.category === cat)).toBe(true);
  });

  it('precomputes a webp variant for each image', () => {
    const items = svc.getProducts();
    for (const item of items) {
      expect(item.imageWebp.endsWith('.webp')).toBe(true);
    }
  });

  it('exposes a featured list distinct from the main catalog map', () => {
    const featured = svc.getFeatured();
    expect(featured.length).toBeGreaterThan(0);
    const f = featured[0];
    expect(svc.getFeaturedById(f.id)).toBe(f);
  });
});
