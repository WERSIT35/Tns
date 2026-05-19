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

@Component({
  selector: 'app-product-dt',
  imports: [RouterLink],
  templateUrl: './product-dt.component.html',
  styleUrl: './product-dt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDtComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsSvc = inject(ProductsService);
  private readonly seo = inject(SeoService);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  readonly product = computed<DisplayProduct | undefined>(() =>
    this.productsSvc.getProductById(this.id()),
  );

  readonly descriptionText = computed(() => {
    const p = this.product();
    if (!p) return '';
    return p.description
      .replaceAll('{{volt}}', String(p.volt))
      .replaceAll('{{watt}}', String(p.watt));
  });

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
