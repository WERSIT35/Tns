import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ProductDtComponent } from './product-dt/product-dt.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'add-item',component:AddItemComponent},
    {path:'product-dt/:id',component:ProductDtComponent},
    {path:'favorite/:id',component:FavoriteComponent},
    {path:'products',component:ProductsComponent},
    {path:'contact',component:ContactComponent},
];
