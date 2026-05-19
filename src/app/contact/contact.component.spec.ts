import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
  });

  it('builds a mailto link from the form fields', () => {
    const cmp = fixture.componentInstance;
    cmp.name.set('Otar');
    cmp.email.set('o@example.com');
    cmp.message.set('Need a heater.');
    const href = cmp.mailtoHref();
    expect(href).toContain('mailto:heatflowzaza@gmail.com');
    expect(href).toContain('Otar');
    expect(href).toContain(encodeURIComponent('Need a heater.'));
  });
});
