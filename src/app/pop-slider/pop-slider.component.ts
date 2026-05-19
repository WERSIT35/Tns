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
import { ProductsService } from '../products.service';
import { DisplayProduct } from '../data/types';

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

  @ViewChild('slider', { static: true }) sliderRef!: ElementRef<HTMLElement>;

  readonly popularList: readonly DisplayProduct[] = this.products.getFeatured();

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
