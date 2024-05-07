import { Component, OnInit} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../../services/photo.service';
import { photo } from '../../../interfaces/photo';


@Component({
  selector: 'app-galleria-banner',
  standalone: true,
  imports: [
    GalleriaModule,
  ],
  templateUrl: './galleria-banner.component.html',
  styleUrl: './galleria-banner.component.css',
  providers: [PhotoService,]

})
export class GalleriaBannerComponent implements OnInit {
  images: photo [] = [];

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
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

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
      this.photoService.getImages().then((photo) => (this.images = photo));
  }
}
