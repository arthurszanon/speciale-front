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
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [
    PanelMenuModule,
    CardModule,
    ButtonModule,
    NgForOf,
    CurrencyPipe
  ],
  providers: [CategoriaService, ProdutosService],
  templateUrl: './products-list-page.component.html',
  styleUrl: './products-list-page.component.css'
})
export class ProductsListPageComponent {

  items: MenuItem[] = [];
  categorias: categorias[] = [];

  categoria: any;
  produtos: produto[] = [];

  isLogged: boolean = localStorage.getItem('logged') === 'true'

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
      this.categoria = params['categoria'];
      if(this.categoria){
        this.produtosService.getProdutosByCategoria(this.categoria).subscribe(produtos => {
          this.produtos = produtos.data;
        });
        this.categoriaService.getCategoriaById(params['categoria']).subscribe(categoria => {
          this.categoria = categoria.data;
        });
      }else{
        this.produtosService.getProdutos().subscribe(produtos => {
          this.produtos = produtos.data;
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
}
