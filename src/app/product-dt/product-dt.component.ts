import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { SeoService } from '../seo.service';
import { DisplayProduct } from '../data/types';
import { SimilarProductsComponent } from '../similar-products/similar-products.component';
import { TranslateService } from '../translate.service';
import { categoryToEn, productNameToEn } from '../data/i18n';

@Component({
  selector: 'app-product-dt',
  imports: [RouterLink, SimilarProductsComponent],
  templateUrl: './product-dt.component.html',
  styleUrl: './product-dt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDtComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsSvc = inject(ProductsService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  readonly product = computed<DisplayProduct | undefined>(() =>
    this.productsSvc.getProductById(this.id()),
  );
  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );

  readonly descriptionText = computed(() => {
    const p = this.product();
    if (!p) return '';
    if (!this.isGeorgian()) {
      return `Voltage: ${p.volt} V, Power: ${p.watt} W`;
    }
    return p.description
      .replaceAll('{{volt}}', String(p.volt))
      .replaceAll('{{watt}}', String(p.watt));
  });

  categoryLabel(category: string): string {
    return this.isGeorgian() ? category : categoryToEn(category);
  }

  productTitle(p: DisplayProduct): string {
    return this.isGeorgian() ? p.name : productNameToEn(p.category, p.name);
  }

  constructor() {
    effect(() => this.syncSeo(this.product()));
  }

  private syncSeo(p: DisplayProduct | undefined): void {
    if (!p) return;
    const url = `https://heatflow.netlify.app/product-dt/${p.id}`;
    this.seo.update({
      title: `${p.name} (${p.code}) | ${p.category} | Tenebi`,
      description: `${p.name} ${p.code} — ${p.volt}V / ${p.watt}W, ${p.length}×${p.width} mm, Ø${p.diameter} mm.`,
      image: `https://heatflow.netlify.app/${p.image}`,
      url,
      type: 'product',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.code,
        category: p.category,
        description: this.descriptionText(),
        image: `https://heatflow.netlify.app/${p.image}`,
        brand: { '@type': 'Brand', name: 'Tenebi' },
      },
    });
  }
}
