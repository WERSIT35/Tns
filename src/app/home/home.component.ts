import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { HeroComponent } from '../hero/hero.component';
import { PopSliderComponent } from '../pop-slider/pop-slider.component';
import { ProductsComponent } from '../products/products.component';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeroComponent, PopSliderComponent, ProductsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly translate = inject(TranslateService);
  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );
}
