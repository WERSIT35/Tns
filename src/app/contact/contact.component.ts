import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../translate.service';
import { SeoService } from '../seo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);

  readonly isGeorgian = toSignal(
    this.translate.currentLanguage$.pipe(map((l) => l === 'ka')),
    { initialValue: true },
  );

  constructor() {
    this.seo.update({
      title: 'კონტაქტი | ტენები | Tenebi',
      description: 'დაგვიკავშირდით — ელიავას ბაზრობა, მაღაზია N157, +995 593 268 984.',
      url: 'https://tns-khaki.vercel.app/contact',
      type: 'website',
    });
  }

  name = signal('');
  email = signal('');
  message = signal('');

  readonly mailtoHref = computed(() => {
    const subject = encodeURIComponent(`Tenebi inquiry — ${this.name() || 'no name'}`);
    const body = encodeURIComponent(
      `Name: ${this.name()}\nEmail: ${this.email()}\n\n${this.message()}`,
    );
    return `mailto:heatflowzaza@gmail.com?subject=${subject}&body=${body}`;
  });
}
