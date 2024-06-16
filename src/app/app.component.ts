import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeService } from './home.service';
import { TranslateService } from './translate.service';
import { Home, Item } from './home/home';
import { SeoService } from './seo.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit{
  constructor(private homeService: HomeService, private translateService: TranslateService,private readonly seo:SeoService) {}

  onLanguageChanged(newLang: string): void {
    this.homeService.updateCategoryList(newLang).subscribe(() => {
      
    });
  }
ngOnInit(): void {
    this.seo.initDefaultMetaInformation();
    this.seo.setTitle('Home Page | Tenebi');
    this.seo.setMetaTags({
      description: 'Welcome to the home page of Tenebi, your source for high-quality heating elements.',
      keywords: 'home, Tenebi, heating elements',
      'og:title': 'მთავარი | ტენები | Tenebi',
      'og:description': 'Welcome to the home page of Tenebi, your source for high-quality heating elements.'
    });
}

}
