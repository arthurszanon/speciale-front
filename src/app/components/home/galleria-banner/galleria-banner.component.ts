import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-galleria-banner',
  standalone: true,
  imports: [
    GalleriaModule,
  ],
  templateUrl: './galleria-banner.component.html',
  styleUrl: './galleria-banner.component.css'
})
export class GalleriaBannerComponent implements OnInit{
  images: any[] | undefined;

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
      this.photoService.getImages().then((images) => (this.images = images));
  }
}
