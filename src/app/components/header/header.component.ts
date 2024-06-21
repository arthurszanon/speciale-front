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
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {AutoFocusModule} from 'primeng/autofocus';
import {OrcamentoService} from '../../services/orcamento.service';
import {saveAs} from 'file-saver';

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
    FormsModule,
    MessageModule,
    AutoFocusModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ CategoriaService, ProdutosService, OrcamentoService ]
})
export class HeaderComponent implements OnInit{
  categorias: categorias[] = [];
  items: MenuItem[] = [
    {
      'label': 'Home',
      'icon': 'pi pi-fw pi-home',
      'routerLink': ['/']
    },
    {
      'label': 'produtos',
      'icon': 'pi pi-fw pi-shopping-cart',
      'items': [],
      'routerLink': ['/produtos'],
    },
  ];
  cartVisible: boolean = false;
  loginVisible: boolean = false;
  registerVisible: boolean = false;
  products: any[] = [];
  loginError: boolean = false;

  loginPayload = {
    email: '',
    senha: ''
  }

  registerPayload = {
    nome: '',

    email: '',
    cep: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  }

  orcamentoLoading: boolean = false;

  isLogged = localStorage.getItem('logged') === 'true';

  constructor (private categoriaService: CategoriaService, private produtoService: ProdutosService, private orcamentoService: OrcamentoService) {}

  ngOnInit() {
    if(localStorage.getItem('categoriasMenu')){
      this.items[1].items = JSON.parse(localStorage.getItem('categoriasMenu') || '{}');
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

  login(){
    if(!localStorage.getItem('users')) {
      this.loginError = true;
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    let user = users.find((user: any) => user.email === this.loginPayload.email)
    if(user && user.senha === this.loginPayload.senha) {
      this.loginVisible = false;
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('logged', 'true')
      this.isLogged = true;
    }else{
      this.loginError = true;
    }
  }

  register(){
    if(!localStorage.getItem('users')) {
      localStorage.setItem('users', '[]')
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if(this.registerPayload.senha === this.registerPayload.confirmarSenha) {
      users.push(this.registerPayload)
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('user', JSON.stringify(this.registerPayload))
      localStorage.setItem('logged', 'true')
      this.registerVisible = false;
    }
  }

  registrarClick() {
    this.loginVisible = false;
    this.registerVisible = true;
  }

  loginClick() {
    this.registerVisible = false;
    this.loginError = false;
    if (this.isLogged) {
      this.isLogged =  localStorage.getItem('logged') === 'true';
      this.registerPayload = JSON.parse(localStorage.getItem('user') || '{}')
      this.registerVisible = true;
    }else{
      this.loginVisible = true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('logged');
    this.registerPayload = {
      nome: '',
      email: '',
      cep: '',
      telefone: '',
      senha: '',
      confirmarSenha: ''
    }
    this.isLogged = false;
    this.registerVisible = false;
    this.loginVisible = true;
  }

  enviarOrcamento() {
    if(!this.isLogged){
      this.loginClick();
      return
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const orcamento = {
      nome: user.nome,
      numeroTelefone: user.telefone,
      produtos: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [],
      status: 'pendente',
      created_at: new Date(),
      updated_at: new Date()
    }
    this.orcamentoLoading = true;
    this.orcamentoService.getOrcamentoPdf(orcamento).subscribe((pdf: any) => {
      this.orcamentoLoading = false;
      this.clearCart();
      this.cartVisible = false;
      var mediaType = 'application/pdf';
      var blob = new Blob([pdf], {type: mediaType});
      saveAs(blob, `orcamento-${new Date().getTime()}.pdf`);

    }, (error) => {
      this.orcamentoLoading = false;
    });
  }
}
