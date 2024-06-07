import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '../translate.service';
import { CommonModule } from '@angular/common';
import { HomeService } from '../home.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [CommonModule,RouterModule]
})
export class HeaderComponent{
  isGeorgian: boolean;

  @Output() languageChanged = new EventEmitter<string>();

  constructor(private translateService: TranslateService,private homeService: HomeService) {
    this.isGeorgian = false;
  }

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe(language => {
      this.isGeorgian = language === 'ka';
    });
  }

  toggleLanguage(): void {
    const newLang = this.getCurrentLanguage() === 'en' ? 'ka' : 'en';
    this.languageChanged.emit(newLang);
  }

  private getCurrentLanguage(): string {
    return this.isGeorgian ? 'ka' : 'en';
  }
}
