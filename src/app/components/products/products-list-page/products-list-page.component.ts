import { Component } from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {CategoriaService} from '../../../services/categoria.service';
import {categorias} from '../../../interfaces/categorias';
import {produto} from '../../../interfaces/produto';
import {ProdutosService} from '../../../services/produtos.service';
import {ActivatedRoute} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../../header/sidebar/sidebar.component';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [
    PanelMenuModule,
    CardModule,
    ButtonModule,
    NgForOf,
    CurrencyPipe,
    NgIf,
    ProgressSpinnerModule,
    NgClass,
    SidebarComponent
  ],
  providers: [CategoriaService, ProdutosService],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.css'
})
export class ProductsListPageComponent {


  isExpanded: boolean = false;

  menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Profile', icon: 'user' },
    { label: 'Settings', icon: 'cog' },
    { label: 'Logout', icon: 'sign-out' }
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  items: MenuItem[] = [];
  categorias: categorias[] = [];

  categoria: any;
  produtos: produto[] = [];

  carrinhoPayload: any;
  quantidadeProdutos: number = 1;



  isLogged: boolean = localStorage.getItem('logged') === 'true'

  loading: boolean = true;

  constructor(private categoriaService: CategoriaService, private produtosService: ProdutosService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    if(localStorage.getItem('categoriasMenu')){
      this.items = JSON.parse(localStorage.getItem('categoriasMenu') || '{}');
    }else{
      this.categoriaService.getCategorias(1, 100).subscribe(categoriasPrimeira => {
        const categoriasPrimeiraPagina = categoriasPrimeira.data
        this.categoriaService.getCategorias(2, 100).subscribe(categoriasSegunda => {
          this.categorias = categoriasPrimeiraPagina.concat(categoriasSegunda.data)
          this.items[1].items = this.categoriaService.categoriasParaMenu(this.categorias)
          localStorage.setItem('categoriasMenu', JSON.stringify(this.items[1].items))
        });
      });
    }

    this.route.params.subscribe(params => {
      this.loading = true;
      this.categoria = params['categoria'];
      if(this.categoria){
        this.produtosService.getProdutosByCategoria(this.categoria).subscribe(produtos => {
          this.produtos = produtos.data;
          this.loading = false;
          this.produtos.map(produto => {
            if(produto.nome){
              produto.nome = produto.nome?.length > 32 ? produto.nome.substring(0, 20) + '...' : produto.nome;
              return produto;
            }
            return produto;
          });
        });
        this.categoriaService.getCategoriaById(params['categoria']).subscribe(categoria => {
          this.categoria = categoria.data;
        });
      }else{
        this.produtosService.getProdutos().subscribe(produtos => {
          this.produtos = produtos.data;
          this.loading = false;
          this.produtos.map(produto => {
            if(produto.nome){
              produto.nome = produto.nome?.length > 32 ? produto.nome.substring(0, 20) + '...' : produto.nome;
              return produto;
            }
            return produto;
          });
        });
        this.categoria = {
          descricao: 'Todos os produtos'
        }
      }
    });

  }

  addCarrinho(product: produto) {
    this.carrinhoPayload = {
      id: product.id,
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      quantidade: this.quantidadeProdutos,
      imagemURL: product.imagemURL
    }
    this.produtosService.addToCart(this.carrinhoPayload);
  }
}
