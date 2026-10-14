import { Injectable } from '@angular/core';
import { CATEGORIES, DisplayProduct, toDisplay } from './data/types';
import { PRODUCTS } from './data/products.data';
import { FEATURED } from './data/featured.data';

const PLACEHOLDER_NAME = 'სახელი';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  readonly categories = CATEGORIES;

  private readonly products: readonly DisplayProduct[] = PRODUCTS.map(toDisplay);
  // Most "popular" entries are the same parts as catalog items (same code or photo), but were
  // saved with placeholder name/specs ("სახელი", 986/987/988 mm). Show the catalog's real data
  // for those; for the rest, never show the placeholder name or specs.
  private readonly featured: readonly DisplayProduct[] = FEATURED.map((f) => {
    const match =
      this.products.find((p) => p.code === f.code) ??
      this.products.find((p) => p.image === f.image);
    if (match) {
      return { ...match, id: f.id, catalogId: match.id, specsKnown: true };
    }
    return { ...toDisplay(f), name: f.name === PLACEHOLDER_NAME ? '' : f.name, specsKnown: false };
  });

  private readonly byId = new Map<number, DisplayProduct>(
    this.products.map((p) => [p.id, p]),
  );
  private readonly featuredById = new Map<number, DisplayProduct>(
    this.featured.map((p) => [p.id, p]),
  );

  private readonly byCategory = new Map<string, DisplayProduct[]>();

  constructor() {
    for (const p of this.products) {
      const arr = this.byCategory.get(p.category) ?? [];
      arr.push(p);
      this.byCategory.set(p.category, arr);
    }
  }

  getProducts(): readonly DisplayProduct[] {
    return this.products;
  }

  getFeatured(): readonly DisplayProduct[] {
    return this.featured;
  }

  getProductById(id: number): DisplayProduct | undefined {
    return this.byId.get(id);
  }

  getFeaturedById(id: number): DisplayProduct | undefined {
    return this.featuredById.get(id);
  }

  getByCategory(category: string): readonly DisplayProduct[] {
    return this.byCategory.get(category) ?? [];
  }

  getSimilar(
    excludeId: number,
    category: string,
    limit = 12,
  ): readonly DisplayProduct[] {
    const pool = this.getByCategory(category);
    const out: DisplayProduct[] = [];
    for (const p of pool) {
      if (p.id === excludeId) continue;
      out.push(p);
      if (out.length >= limit) break;
    }
    return out;
  }
}
