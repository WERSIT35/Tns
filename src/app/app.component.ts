import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from './translate.service';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.initDefaultMetaInformation();
  }

  onLanguageChanged(newLang: string): void {
    this.translate.setLanguage(newLang);
  }
}
