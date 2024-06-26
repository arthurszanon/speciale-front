import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {ProductsListPageComponent} from './components/products/products-list-page/products-list-page.component';
import { LoginComponent } from './components/header/login/login.component';
import { CadastrarComponent } from './components/header/cadastrar/cadastrar.component';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

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
    path: 'produtos/nome/:nome',
    component: ProductsListPageComponent
  },
  {
      path:'checkout',
      component: CheckoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'categorias',
    component: SidebarComponent
  },
  {
    path:'header',
    component: HeaderComponent
  }
];
