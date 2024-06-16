import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
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
