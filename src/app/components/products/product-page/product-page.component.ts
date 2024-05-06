import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { produtos } from '../../../interfaces/produtos';
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

  constructor(private produtosService: ProdutosService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      const id = res['id'];
      this.produtosService.getById(id)
      .then((data) => {
        this.product=data 
      })
    })
  }

}
