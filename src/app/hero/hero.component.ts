import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { TranslateService } from '../translate.service';
import { CategoryIconComponent } from '../category-icon/category-icon.component';
import { ProductsService } from '../products.service';
import { CATEGORIES } from '../data/types';
import { categoryToEn } from '../data/i18n';

interface Stat {
  value: string;
  ka: string;
  en: string;
}

interface Feature {
  iconKey: 'quality' | 'custom' | 'fast';
  ka: string;
  en: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  imports: [RouterLink, CategoryIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly translate = inject(TranslateService);
  private readonly products = inject(ProductsService);

  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );

  readonly topCategories = CATEGORIES.slice(0, 6);

  readonly stats: readonly Stat[] = [
    { value: `${this.products.getProducts().length}+`, ka: 'პროდუქტი', en: 'products' },
    { value: `${CATEGORIES.length}`, ka: 'კატეგორია', en: 'categories' },
    { value: '24/7', ka: 'მხარდაჭერა', en: 'support' },
  ];

  readonly features: readonly Feature[] = [
    { iconKey: 'quality', ka: 'უმაღლესი ხარისხი', en: 'Top quality' },
    { iconKey: 'custom', ka: 'ინდივიდუალური დამზადება', en: 'Custom-made' },
    { iconKey: 'fast', ka: 'სწრაფი მხარდაჭერა', en: 'Fast support' },
  ];

  trackCategory(_index: number, value: string): string {
    return value;
  }

  categoryLabel(category: string): string {
    return this.isGeorgian() ? category : categoryToEn(category);
  }
}
