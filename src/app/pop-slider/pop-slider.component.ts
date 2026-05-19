import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { DisplayProduct } from '../data/types';
import { TranslateService } from '../translate.service';
import { categoryToEn, productNameToEn } from '../data/i18n';

@Component({
  selector: 'app-pop-slider',
  imports: [RouterLink],
  templateUrl: './pop-slider.component.html',
  styleUrl: './pop-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopSliderComponent implements AfterViewInit {
  private readonly products = inject(ProductsService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);

  @ViewChild('slider', { static: true }) sliderRef!: ElementRef<HTMLElement>;

  readonly popularList: readonly DisplayProduct[] = this.products.getFeatured();
  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );

  title(item: DisplayProduct): string {
    return this.isGeorgian()
      ? item.name
      : productNameToEn(item.category, item.name);
  }

  categoryLabel(category: string): string {
    return this.isGeorgian() ? category : categoryToEn(category);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const { default: Splide } = await import('@splidejs/splide');
    new Splide(this.sliderRef.nativeElement, {
      type: 'loop',
      perPage: 4,
      pauseOnHover: false,
      pagination: false,
      autoplay: true,
      arrows: true,
      gap: '1rem',
      breakpoints: {
        1100: { perPage: 3 },
        780: { perPage: 2 },
        520: { perPage: 1 },
      },
    }).mount();
  }
}
