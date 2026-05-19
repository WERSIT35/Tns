# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tenebi / HeatFlow — Angular 20 catalog site for tubular heating elements (deployed at https://heatflow.netlify.app/). Bilingual Georgian (ka, default) / English (en). Originally generated with Angular CLI 17.3.2; upgraded to Angular 20.

## Commands

- `npm start` — dev server on http://localhost:4200 (alias for `ng serve`).
- `npm run build` — production build with SSR + prerender; output to `dist/tenebi/`.
- `npm run watch` — dev-config build in watch mode.
- `npm test` — Karma + Jasmine tests in Chrome. Headless once: `ng test --watch=false --browsers=ChromeHeadless`. Single spec: `ng test --include='src/app/path/to.spec.ts'`.
- `npm run serve:ssr:Tenebi` — run the prerendered SSR bundle via Node (`dist/tenebi/server/server.mjs`), default port 4000 (override with `SSR_PORT`). The Express wrapper enforces `allowedHosts` (default `localhost,heatflow.netlify.app`, override with `ALLOWED_HOSTS=a,b,c`).
- `node scripts/optimize-images.mjs` — re-runs WebP generation for catalog images and recompresses `banner.png`. Idempotent: skips files that already have a `.webp` neighbor. Re-run after dropping new images into `src/assets/tenebi/`.
- `ng extract-i18n` — extracts translatable strings into `messages.xlf` (Angular i18n is configured but runtime translation is custom — see below).

Production bundle budgets: initial 350 KB warn / 600 KB error, anyComponentStyle 12 KB warn / 24 KB error.

## Architecture

### Standalone components, no NgModules, lazy-loaded routes
Bootstrap is `bootstrapApplication(AppComponent, appConfig)` in `src/main.ts`. Routing in `src/app/app.routes.ts` uses `loadComponent: () => import(...)` for **every** route so each lazy-loads its own chunk. Per-route `title` is set in the route config; richer per-route SEO is applied by each component via `SeoService.update()` in its constructor.

### SSR + prerender
- `angular.json` enables `prerender: true` and `ssr.entry: server.ts`. Static routes (`/`, `/products`, `/contact`) are prerendered at build time; dynamic ones (`/product-dt/:id`, `/favorite/:id`) render at request time.
- `server.ts` is an Express app wrapping `@angular/ssr/node`'s `CommonEngine`. Angular 19+ requires `allowedHosts` on the engine — driven by the `ALLOWED_HOSTS` env var.
- Any code that touches `window`, `document`, or browser-only libs **must** be guarded with `isPlatformBrowser(PLATFORM_ID)`. Existing examples: `TranslateService` (writes `document.documentElement.lang`), `PopSliderComponent.ngAfterViewInit` (instantiates Splide). Splide is loaded via `await import('@splidejs/splide')` inside the platform check so it lands in its own lazy chunk and never touches SSR.

### Data layer
`src/app/data/` holds typed, frozen catalog data:
- `types.ts` — `Product` interface, `DisplayProduct extends Product` (adds `imageWebp`), the `CATEGORIES` tuple, and `toDisplay()` which derives the WebP variant once.
- `products.data.ts` — `PRODUCTS: readonly Product[]` (~309 catalog entries).
- `featured.data.ts` — `FEATURED: readonly Product[]` (~9 popular entries with id 301–309+).

`src/app/products.service.ts` (`ProductsService`) is the only consumer-facing API. It builds `Map<id, DisplayProduct>` indexes for `getProductById` / `getFeaturedById` (O(1)) and a `Map<category, DisplayProduct[]>` index for `getByCategory`. The featured ID space (300+, 1000+) is currently disjoint from the main catalog (1–~330) — if you add new featured entries make sure they don't collide.

**The old `HomeService` with parallel ka/en arrays was removed.** The English list was never populated and the language toggle never reached it, so it was dead code. UI labels are still toggled in-template via `isGeorgian()` signals derived from `TranslateService.currentLanguage$`.

### Routes
Defined in `src/app/app.routes.ts`, all lazy:
- `/` → `HomeComponent` (composes `BannerComponent`, `PopSliderComponent`, `ProductsComponent`)
- `/products` → `ProductsComponent` (category-tabbed listing with signals)
- `/product-dt/:id` → `ProductDtComponent` (catalog item detail, emits JSON-LD `Product` schema)
- `/favorite/:id` → `FavoriteComponent` (featured item detail; shares styling with product detail)
- `/contact` → `ContactComponent` (mailto-based contact form)

### Change detection + state
Every component is `ChangeDetectionStrategy.OnPush`. State that the template depends on is exposed as `signal` / `computed`. Route params arrive via `toSignal(this.route.paramMap.pipe(map(...)))`. SEO updates in detail pages fire from `effect(() => this.syncSeo(this.product()))`. There is no global store — `ProductsService` is the single source of truth and is immutable.

### Internationalization
Runtime language switching is **custom**, not `@angular/localize`. `TranslateService` holds a `BehaviorSubject<'ka' | 'en'>`; `HeaderComponent` emits `(languageChanged)`, `AppComponent` forwards it to `TranslateService.setLanguage()`. Every component that needs to react reads `isGeorgian = toSignal(translate.currentLanguage$.pipe(map(l => l === 'ka')))`. UI strings live inline in templates (`{{ isGeorgian() ? 'ka' : 'en' }}`).

### SEO
`SeoService` (`src/app/seo.service.ts`) wraps `Title`/`Meta`/`DOCUMENT`. Single entrypoint `update({ title, description, keywords, image, url, type, jsonLd })`:
- Uses `meta.updateTag` (not `addTags`) so re-navigation doesn't stack duplicates.
- Sets Open Graph + Twitter Card tags from the same call.
- Maintains a single `<link rel="canonical">`.
- Optionally injects a single `<script type="application/ld+json" id="app-jsonld">`. `ProductDtComponent` emits a schema.org `Product` JSON-LD payload.

### Image pipeline
- `src/assets/banner.png` is the hero (also `banner.webp` for modern browsers). Preloaded in `src/index.html`.
- Catalog images live in `src/assets/tenebi/<Category>/<code>.{jpg,png}` and have neighboring `.webp` variants generated by `scripts/optimize-images.mjs`.
- The 24 MB `Balçık katalog 2019.pdf` is kept in `src/assets/` for archival but excluded from the build via the `ignore: ["**/*.pdf"]` rule in `angular.json`'s assets config.
- Every catalog `<img>` ships with intrinsic `width`/`height`, `loading="lazy"`, `decoding="async"`, inside a `<picture>` with a WebP `<source>` for browser-side format negotiation.

## Styling

Design tokens (color/spacing/typography/radius/shadow/timing) live as CSS custom properties on `:root` in `src/styles.scss`. Component SCSS reads them — never hard-code values. Tailwind has been removed (was already unused). Splide CSS is imported globally via `@use '@splidejs/splide/css'`.

`html[lang='ka']` and `html[lang='en']` selectors swap the body font (`ALK Sanet` vs `Reddit Mono`). The old `:lang(...)` selectors broke Angular's CSS parser — don't reintroduce them.

A `prefers-reduced-motion` block disables all transitions globally. Focus styles use `:focus-visible` with a brand-colored outline.

## TypeScript

`tsconfig.json` enables `strict`, `strictTemplates`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `moduleResolution: "bundler"`. Indent 2 spaces, single quotes (`.editorconfig`).
