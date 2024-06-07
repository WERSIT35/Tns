import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  isGeorgian: boolean;

  constructor(private translateService: TranslateService) {
    this.isGeorgian = false; // Default value
  }

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe(language => {
      this.isGeorgian = language === 'ka';
      console.log(`Current language is ${language}, isGeorgian: ${this.isGeorgian}`);
    });
  }
}
