import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { produtos } from '../../../interfaces/produtos';
import { ProdutosService } from '../../../services/produtos.service';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-carousel-model',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './carousel-model.component.html',
  styleUrl: './carousel-model.component.css',
  providers:[ProdutosService, RouterLink, Router]
})
export class CarouselModelComponent implements OnInit{
  
  products: produtos[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.list()
    .subscribe(dados => this.products = dados);


      this.responsiveOptions = [
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
  }
}