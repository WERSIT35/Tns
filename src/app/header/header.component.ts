import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Output,
  EventEmitter,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isGeorgian = signal(true);
  readonly menuOpen = signal(false);

  @Output() languageChanged = new EventEmitter<string>();

  constructor() {
    this.translate.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => this.isGeorgian.set(lang === 'ka'));

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleLanguage(): void {
    this.languageChanged.emit(this.isGeorgian() ? 'en' : 'ka');
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
