import { Component, NgModule } from '@angular/core';
import { CarouselModelComponent } from '../products/carousel-model/carousel-model.component';
import { GalleriaBannerComponent } from './galleria-banner/galleria-banner.component';
import { CommonModule } from '@angular/common';
import { BannerEntradaComponent } from './banner-entrada/banner-entrada.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModelComponent,
    GalleriaBannerComponent,
    CommonModule,
    BannerEntradaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
