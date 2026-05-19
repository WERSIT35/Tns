import { DOCUMENT, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly currentLanguageSubject = new BehaviorSubject<string>('ka');
  readonly currentLanguage$: Observable<string> =
    this.currentLanguageSubject.asObservable();

  setLanguage(language: string): void {
    if (this.isBrowser) {
      this.doc.documentElement.lang = language;
    }
    this.currentLanguageSubject.next(language);
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage$;
  }
}
