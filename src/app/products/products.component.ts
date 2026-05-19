import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { SeoService } from '../seo.service';
import { DisplayProduct } from '../data/types';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private readonly products = inject(ProductsService);
  private readonly seo = inject(SeoService);

  readonly categories = this.products.categories;
  readonly selectedIndex = signal(0);

  constructor() {
    this.seo.update({
      title: 'პროდუქცია | ტენები | Tenebi',
      description:
        'სრული კატალოგი — ღუმელის, ტოსტერის, გრილის, ყავის, თერმოსტატის, სამრეწველო, წყლის და ვენტილაციის ტენები.',
      url: 'https://heatflow.netlify.app/products',
      type: 'website',
    });
  }

  readonly selectedItems = computed<readonly DisplayProduct[]>(() => {
    const cat = this.categories[this.selectedIndex()];
    return this.products.getByCategory(cat);
  });

  selectCategory(i: number): void {
    this.selectedIndex.set(i);
  }

  trackById(_index: number, item: DisplayProduct): number {
    return item.id;
  }
}
