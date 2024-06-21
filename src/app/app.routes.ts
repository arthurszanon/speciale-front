import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {ProductsListPageComponent} from './components/products/products-list-page/products-list-page.component';

export const routes: Routes = [
  {
      path:"",
      component: HomeComponent
  },
  {
      path:"produto/:id",
      component: ProductPageComponent
  },
  {
    path: 'produtos',
    component: ProductsListPageComponent
  },
  {
    path: 'produtos/:categoria',
    component: ProductsListPageComponent
  },
  {
      path:'checkout',
      component: CheckoutComponent
  },
];
