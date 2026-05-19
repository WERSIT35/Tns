import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { BannerComponent } from '../banner/banner.component';
import { PopSliderComponent } from '../pop-slider/pop-slider.component';
import { ProductsComponent } from '../products/products.component';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [BannerComponent, PopSliderComponent, ProductsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly translate = inject(TranslateService);
  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );
}
