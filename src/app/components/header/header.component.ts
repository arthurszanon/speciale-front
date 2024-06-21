import { Component,  OnInit  } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../../services/categoria.service';
import { categorias } from '../../interfaces/categorias';
import {MenuItem} from 'primeng/api';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {produto} from '../../interfaces/produto';
import {ButtonModule} from 'primeng/button';
import {ProdutosService} from '../../services/produtos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    HttpClientModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    BadgeModule,
    DialogModule,
    DataViewModule,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ CategoriaService, ProdutosService ]
})
export class HeaderComponent implements OnInit{
  categorias: categorias[] = [];
  items: MenuItem[] = [
    {
      'label': 'Home',
      'icon': 'pi pi-fw pi-home',
    },
    {
      'label': 'Produtos',
      'icon': 'pi pi-fw pi-shopping-cart',
    },
    {
      'label': 'categorias',
      'icon': 'pi pi-fw pi-tags',
      'items': []
    },
    {
      'label': 'login',
      'icon': 'pi pi-fw pi-user',
    },
    {
      'label': 'cadastro',
      'icon': 'pi pi-fw pi-user-plus',
    },
  ];
  cartVisible: boolean = false;
  products: any[] = [];

  constructor (private categoriaService: CategoriaService, private produtoService: ProdutosService) {}

  ngOnInit() {
    if(localStorage.getItem('categoriasMenu')){
      this.items[2].items = JSON.parse(localStorage.getItem('categoriasMenu') || '{}');
    }else{
      this.categoriaService.getCategorias(1, 100).subscribe(categoriasPrimeira => {
        const categoriasPrimeiraPagina = categoriasPrimeira.data
        this.categoriaService.getCategorias(2, 100).subscribe(categoriasSegunda => {
          this.categorias = categoriasPrimeiraPagina.concat(categoriasSegunda.data)
          this.items[2].items = this.categoriaService.categoriasParaMenu(this.categorias)
          localStorage.setItem('categoriasMenu', JSON.stringify(this.items[2].items))
        });
      });
    }

    if(localStorage.getItem('cart')) {
      this.products = JSON.parse(localStorage.getItem('cart') || '{}');
    }
  }

  showDialog() {
    this.products = this.produtoService.getCart();
    this.cartVisible = true;
  }

  clearCart() {
   this.produtoService.clearCart();
   this.products = this.produtoService.getCart();
   this.cartVisible = false;
  }
}
