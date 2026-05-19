import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly translate = inject(TranslateService);
  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );
  readonly year = new Date().getFullYear();
}
