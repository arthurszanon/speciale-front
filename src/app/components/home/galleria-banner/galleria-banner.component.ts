import { Component, OnInit} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../../services/photo.service';
import { photo } from '../../../interfaces/photo';
import { photo2 } from '../../../interfaces/photo2';
import { Photo2Service } from '../../../services/photo2.service';

@Component({
  selector: 'app-galleria-banner',
  standalone: true,
  imports: [
    GalleriaModule,
  ],
  templateUrl: './galleria-banner.component.html',
  styleUrl: './galleria-banner.component.css',
  providers: [PhotoService, Photo2Service]

})
export class GalleriaBannerComponent implements OnInit {
  images: photo [] = [];
  images2: photo2 [] = [];

  responsiveOptions: any[] = [
      {
          breakpoint: '1024 px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private photoService: PhotoService, private photo2Service: Photo2Service) {}

  ngOnInit() {
      this.photoService.getImages().then((photo) => (this.images = photo));
      this.photo2Service.getImages().then((photo2) => (this.images2 = photo2));
  }
}
