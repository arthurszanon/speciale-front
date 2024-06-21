import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { produto } from '../../../interfaces/produto';
import { ProdutosService } from '../../../services/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    GalleriaModule,
    TagModule,
    ButtonModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  providers:[ProdutosService, ],
})
export class ProductPageComponent implements OnInit{
  product: any = {};
  produtoId: string = '';

  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.produtoId = res['id'];
      this.produtosService.getProdutoById(this.produtoId).subscribe((res: any) => {
        this.product = res;
      });
    })
  }

}
