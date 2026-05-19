import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { SeoService } from '../seo.service';
import { DisplayProduct } from '../data/types';
import { CategoryIconComponent } from '../category-icon/category-icon.component';
import { TranslateService } from '../translate.service';
import { categoryToEn, productNameToEn } from '../data/i18n';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CategoryIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly products = inject(ProductsService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );

  readonly categories = this.products.categories;
  readonly selectedIndex = signal(0);

  constructor() {
    this.seo.update({
      title: 'პროდუქცია | ტენები | Tenebi',
      description:
        'სრული კატალოგი — ღუმელის, ტოსტერის, გრილის, ყავის, თერმოსტატის, სამრეწველო, წყლის და ვენტილაციის ტენები.',
      url: 'https://tns-khaki.vercel.app/products',
      type: 'website',
    });
  }

  readonly selectedItems = computed<readonly DisplayProduct[]>(() => {
    const cat = this.categories[this.selectedIndex()];
    return this.products.getByCategory(cat);
  });

  categoryLabel(category: string): string {
    return this.isGeorgian() ? category : categoryToEn(category);
  }

  productTitle(item: DisplayProduct): string {
    return this.isGeorgian()
      ? item.name
      : productNameToEn(item.category, item.name);
  }

  selectCategory(i: number): void {
    this.selectedIndex.set(i);
  }

  trackById(_index: number, item: DisplayProduct): number {
    return item.id;
  }
}
