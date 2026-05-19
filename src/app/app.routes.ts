import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: 'ტენები | Tenebi | HeatFlow',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
    title: 'პროდუქტი | Tenebi',
  },
  {
    path: 'product-dt/:id',
    loadComponent: () =>
      import('./product-dt/product-dt.component').then(
        (m) => m.ProductDtComponent,
      ),
  },
  {
    path: 'favorite/:id',
    loadComponent: () =>
      import('./favorite/favorite.component').then((m) => m.FavoriteComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'კონტაქტი | Tenebi',
  },
];
