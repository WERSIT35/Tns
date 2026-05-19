import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  CategoryIconKey,
  getCategoryIconKey,
} from '../data/category-icons';

@Component({
  selector: 'app-category-icon',
  standalone: true,
  templateUrl: './category-icon.component.html',
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryIconComponent {
  readonly category = input.required<string>();
  readonly size = input<number>(20);

  readonly iconKey = computed<CategoryIconKey>(() =>
    getCategoryIconKey(this.category()),
  );
}
