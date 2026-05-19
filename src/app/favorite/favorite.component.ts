import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { DisplayProduct } from '../data/types';

@Component({
  selector: 'app-favorite',
  imports: [RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsSvc = inject(ProductsService);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  readonly product = computed<DisplayProduct | undefined>(() =>
    this.productsSvc.getFeaturedById(this.id()),
  );

  readonly descriptionText = computed(() => {
    const p = this.product();
    if (!p) return '';
    return p.description
      .replaceAll('{{volt}}', String(p.volt))
      .replaceAll('{{watt}}', String(p.watt));
  });
}
