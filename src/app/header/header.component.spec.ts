import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('emits languageChanged when toggled', (done) => {
    const cmp = fixture.componentInstance;
    cmp.languageChanged.subscribe((lang) => {
      expect(['ka', 'en']).toContain(lang);
      done();
    });
    cmp.toggleLanguage();
  });

  it('toggles menuOpen state', () => {
    const cmp = fixture.componentInstance;
    expect(cmp.menuOpen()).toBe(false);
    cmp.toggleMenu();
    expect(cmp.menuOpen()).toBe(true);
    cmp.toggleMenu();
    expect(cmp.menuOpen()).toBe(false);
  });
});
