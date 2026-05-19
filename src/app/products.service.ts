import { Injectable } from '@angular/core';
import { CATEGORIES, DisplayProduct, toDisplay } from './data/types';
import { PRODUCTS } from './data/products.data';
import { FEATURED } from './data/featured.data';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  readonly categories = CATEGORIES;

  private readonly products: readonly DisplayProduct[] = PRODUCTS.map(toDisplay);
  private readonly featured: readonly DisplayProduct[] = FEATURED.map(toDisplay);

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
