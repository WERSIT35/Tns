
import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://heatflow.netlify.app';
const SITE_NAME = 'Tenebi | HeatFlow';
const DEFAULT_IMAGE = `${SITE_URL}/assets/banner.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  initDefaultMetaInformation(): void {
    this.update({
      title: 'ტენები | Tenebi | HeatFlow — Tubular Heating Elements',
      description:
        'უმაღლესი ხარისხის ტენები — ღუმელის, ტოსტერის, გრილის, ყავის აპარატის, სამრეწველო, წყლის, სარეცხი მანქანის და ვენტილაციის ტენები.',
      keywords:
        'Tenebi, ტენი, ტენები, ღუმელის ტენი, ტოსტერის ტენი, გრილის ტენი, თერმოსტატი, ყავის აპარატის ტენი, სარეცხი მანქანის ტენი, წყლის გამაცხელებელი',
      image: DEFAULT_IMAGE,
      url: `${SITE_URL}/`,
      type: 'website',
    });
  }

  update(meta: SeoMeta): void {
    if (meta.title) {
      this.title.setTitle(meta.title);
    }
    const ogUrl = meta.url ?? SITE_URL;
    const ogImage = meta.image ?? DEFAULT_IMAGE;

    this.upsert('description', meta.description);
    this.upsert('keywords', meta.keywords);
    this.upsertProp('og:title', meta.title);
    this.upsertProp('og:description', meta.description);
    this.upsertProp('og:image', ogImage);
    this.upsertProp('og:url', ogUrl);
    this.upsertProp('og:site_name', SITE_NAME);
    this.upsertProp('og:type', meta.type ?? 'website');
    this.upsert('twitter:card', 'summary_large_image');
    this.upsert('twitter:title', meta.title);
    this.upsert('twitter:description', meta.description);
    this.upsert('twitter:image', ogImage);

    this.setCanonical(ogUrl);
    if (meta.jsonLd) {
      this.setJsonLd(meta.jsonLd);
    }
  }

  private upsert(name: string, content: string | undefined): void {
    if (!content) return;
    this.meta.updateTag({ name, content });
  }

  private upsertProp(property: string, content: string | undefined): void {
    if (!content) return;
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }

  private setJsonLd(data: Record<string, unknown>): void {
    const id = 'app-jsonld';
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
