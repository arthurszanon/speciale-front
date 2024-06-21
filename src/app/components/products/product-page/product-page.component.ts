import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { produto } from '../../../interfaces/produto';
import { ProdutosService } from '../../../services/produtos.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {CarouselModule} from 'primeng/carousel';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';




@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    GalleriaModule,
    TagModule,
    ButtonModule,
    CarouselModule,
    RouterLink,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  providers:[ProdutosService, ],
})
export class ProductPageComponent implements OnInit{

  product: produto = {};
  products: produto[] = [];
  produtoId: string = '';

  carrinhoPayload: any;
  quantidadeProdutos: number = 1;

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.produtoId = res['id'];
      this.produtosService.getProdutoById(this.produtoId).subscribe((res: any) => {
        this.product = res.data[0];
      });
      this.produtosService.getProdutos().subscribe(produtos => {
        this.products = produtos.data
      });

    })
  }

  addCarrinho() {
    this.carrinhoPayload = {
      id: this.product.id,
      nome: this.product.nome,
      descricao: this.product.descricao,
      preco: this.product.preco,
      quantidade: this.quantidadeProdutos,
      imagemURL: this.product.imagemURL
    }
    this.produtosService.addToCart(this.carrinhoPayload);
  }


}
