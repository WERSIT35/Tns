import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeService } from './home.service';
import { TranslateService } from './translate.service';
import { SeoService } from './seo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly homeService = inject(HomeService);
  private readonly translateService = inject(TranslateService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.initDefaultMetaInformation();
  }

  onLanguageChanged(newLang: string): void {
    this.translateService.setLanguage(newLang);
    this.homeService.updateCategoryList(newLang).subscribe();
  }
}
