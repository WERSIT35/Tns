import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeService } from './home.service';
import { TranslateService } from './translate.service';
import { Home, Item } from './home/home';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  constructor(private homeService: HomeService, private translateService: TranslateService) {}

  onLanguageChanged(newLang: string): void {
    this.homeService.updateCategoryList(newLang).subscribe(() => {
      // Optionally handle any further logic after language change
    });
  }
}
