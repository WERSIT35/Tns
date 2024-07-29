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
    this.seo.setTitle('ტენები | Tubular Heating Elements');
    this.seo.setMetaTags({
        description: 'Welcome to the home page of Tenebi, your source for high-quality tubular heating elements and heating solutions.',
        keywords: 'home, Tenebi, heating elements, tubular heating elements, industrial heating solutions, custom heating elements, ტენები, ტენები, ტენები, სარეცხი მანქანის ტენები, საცხობის ტენები, ტენი, საშაურმის ტენები, საშაურმის ტენი, ტოსტერის ტენები, ტოსტერის ტენი, ყავის აპარატის ტენები, ყავის აპარატის ტენი, ღუმელის ტენები,ღუმელის ტენი,გრილის ტენები, გრილის ტენი, თერმოსტატი, თერმოსტატები, თერმო რეგულატორები, სამრეწველო ტენები, წყლის გამაცხელებელი ტენები,სამრეწველო ტენი, წყლის გამაცხელებელი ტენი, ვენტილაციის ტენი, ვენტილატორის ტენი, კონდიციონერის ტენი, კონდიციონერის ტენები',
        'og:title': 'მთავარი | ტენები | Tenebi',
        'og:description': 'Welcome to the home page of Tenebi, your source for high-quality tubular heating elements and heating solutions.',
        'og:type': 'website',
        'og:url': 'https://heatflow.netlify.app/',
        'og:site_name': 'Tenebi | HeatFlow | Tubular Heating Elements',
    });
}


}
