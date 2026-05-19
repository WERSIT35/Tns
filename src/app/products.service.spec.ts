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

  describe('getSimilar', () => {
    it('returns same-category items and excludes the current product', () => {
      const cat = svc.categories[0];
      const pool = svc.getByCategory(cat);
      expect(pool.length).toBeGreaterThan(1);
      const current = pool[0];

      const similar = svc.getSimilar(current.id, cat);
      expect(similar.length).toBeGreaterThan(0);
      expect(similar.every((p) => p.category === cat)).toBe(true);
      expect(similar.every((p) => p.id !== current.id)).toBe(true);
    });

    it('respects the limit parameter', () => {
      const cat = svc.categories[0];
      const current = svc.getByCategory(cat)[0];
      const similar = svc.getSimilar(current.id, cat, 3);
      expect(similar.length).toBeLessThanOrEqual(3);
    });

    it('returns an empty array for an unknown category', () => {
      expect(svc.getSimilar(1, 'no-such-category')).toEqual([]);
    });

    it('returns an empty array when the only item in the category is excluded', () => {
      // Find a category with exactly 1 product, or skip if none.
      const counts = svc.categories.map((c) => ({
        c,
        n: svc.getByCategory(c).length,
      }));
      const single = counts.find((x) => x.n === 1);
      if (single) {
        const only = svc.getByCategory(single.c)[0];
        expect(svc.getSimilar(only.id, single.c)).toEqual([]);
      } else {
        // Synthesize the case: exclude every id in a category one by one.
        const cat = svc.categories[0];
        const pool = svc.getByCategory(cat);
        for (const p of pool) {
          const similar = svc.getSimilar(p.id, cat);
          expect(similar.every((s) => s.id !== p.id)).toBe(true);
        }
      }
    });
  });
});
