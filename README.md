# Tenebi — heating-element product catalog

A bilingual (Georgian / English) product catalog I built for a Georgian supplier of industrial heating elements. Customers browse parts by category, check their specs, save favourites and order through WhatsApp.

**🌐 Live:** [tns-khaki.vercel.app](https://tns-khaki.vercel.app/)

## Highlights

- **Mobile Lighthouse went from 73 to 91** after the switch to **zoneless change detection** (no zone.js) and **incremental hydration** for the slider and the catalog. Total blocking time dropped from 517 ms to 237 ms.
- **Upgraded step by step from Angular 17 to 20:** the new control flow, lazy routes, `DOCUMENT` moved to `@angular/core` and `moduleResolution: bundler`. Components were rewritten with signals and OnPush.
- **Full i18n:** a custom translate service covers spec labels, units, breadcrumbs and similar products, and the page `lang` follows the selected language
- **SEO:** each route has its own meta tags and **JSON-LD** product data, plus a sitemap and robots.txt, and the site is verified in Google Search Console
- **Lighter pages:** fonts are self-hosted (one variable woff2, no Google Fonts request) and the Font Awesome CDN is gone. On phones the home page went from 14,067 px to 6,622 px tall.
- **Accessibility:** the brand colour got a text-safe variant (5.1:1 contrast on white), landmarks are correct, and reduced motion is respected

## Stack

Angular 20 · SSR (`@angular/ssr`) · TypeScript · SCSS with design tokens · Vercel

## Run locally

```bash
npm install
npm start                # http://localhost:4200
npm run build
npm run serve:ssr:Tenebi
```

## Structure

```
src/app/
  home, products, product-dt, similar-products, favorite, contact   feature components
  products.service.ts   catalog data access
  translate.service.ts  KA/EN translations
  seo.service.ts        per-route meta + JSON-LD
  data/                 catalog data
```

## Note

Client project, shared as a portfolio sample. All rights reserved by the client and the author.
