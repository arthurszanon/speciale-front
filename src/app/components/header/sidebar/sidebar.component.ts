import { Component, OnInit } from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api/menuitem';
import { categorias } from '../../../interfaces/categorias';
import { produto } from '../../../interfaces/produto';
import { CategoriaService } from '../../../services/categoria.service';
import { ProdutosService } from '../../../services/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    PanelMenuModule,
    CardModule,
    ButtonModule,
    NgForOf,
    CurrencyPipe,
    NgIf,
    NgClass,
    ProgressSpinnerModule,
    SidebarModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers:[CategoriaService, ProdutosService]
})

export class SidebarComponent {

  items: MenuItem[] = [];
  categorias: categorias[] = [];

  categoria: any;
  produtos: produto[] = [];

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

  isExpanded: boolean = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
