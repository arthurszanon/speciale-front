import { Component } from '@angular/core';
import { CarouselModelComponent } from '../products/carousel-model/carousel-model.component';
import { GalleriaBannerComponent } from './galleria-banner/galleria-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModelComponent,
    GalleriaBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
