import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryIconComponent } from '../category-icon/category-icon.component';
import { ProductsService } from '../products.service';
import { DisplayProduct } from '../data/types';

interface SplideLike {
  mount: () => SplideLike;
  refresh: () => void;
  destroy: () => void;
  go: (target: string | number) => void;
}

@Component({
  selector: 'app-similar-products',
  standalone: true,
  imports: [RouterLink, CategoryIconComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarProductsComponent {
  private readonly products = inject(ProductsService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly category = input.required<string>();
  readonly excludeId = input.required<number>();
  readonly limit = input<number>(12);
  readonly heading = input<string>('Similar products');

  readonly items = computed<readonly DisplayProduct[]>(() =>
    this.products.getSimilar(this.excludeId(), this.category(), this.limit()),
  );

  @ViewChild('slider', { static: false })
  sliderRef?: ElementRef<HTMLElement>;

  private splide: SplideLike | null = null;
  private destroyed = false;
  private syncing = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.splide?.destroy();
      this.splide = null;
    });

    if (!this.isBrowser) return;

    // React to items() changes (initial render, route param change, category change).
    effect(() => {
      const count = this.items().length;
      queueMicrotask(() => this.syncSlider(count));
    });
  }

  trackById(_index: number, item: DisplayProduct): number {
    return item.id;
  }

  private async syncSlider(count: number): Promise<void> {
    if (this.destroyed || this.syncing) return;
    this.syncing = true;
    try {
      if (count === 0) {
        this.splide?.destroy();
        this.splide = null;
        return;
      }
      if (!this.sliderRef) return;
      if (this.splide) {
        this.splide.refresh();
        this.splide.go(0);
        return;
      }
      const { default: Splide } = await import('@splidejs/splide');
      if (this.destroyed || !this.sliderRef) return;
      const inst = new Splide(this.sliderRef.nativeElement, {
        type: 'slide',
        perPage: 4,
        gap: '1rem',
        pagination: false,
        arrows: true,
        drag: true,
        keyboard: 'focused',
        breakpoints: {
          1100: { perPage: 3 },
          780: { perPage: 2, arrows: false },
          500: { perPage: 1.4, arrows: false, gap: '0.6rem' },
        },
      });
      inst.mount();
      this.splide = inst as unknown as SplideLike;
    } finally {
      this.syncing = false;
    }
  }
}
