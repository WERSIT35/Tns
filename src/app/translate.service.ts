import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const defaultLanguage = 'ka';
    this.currentLanguageSubject = new BehaviorSubject<string>(defaultLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
    if (this.isBrowser) {
      this.setLanguage(defaultLanguage);
    }
  }

  setLanguage(language: string): void {
    if (this.isBrowser) {
      console.log(`Setting language to: ${language}`);
      document.documentElement.lang = language;
    }
    this.currentLanguageSubject.next(language);
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage$;
  }
}
