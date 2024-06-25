import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../services/empresas.service';

@Component({
  selector: 'app-carouselhome',
  standalone: true,
  imports: [TagModule,ButtonModule,CarouselModule],
  templateUrl: './carouselhome.component.html',
  styleUrl: './carouselhome.component.css',
  providers: [EmpresasService]
})
export class CarouselhomeComponent implements OnInit{
    empresas: empresa[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private empresasService: EmpresasService) {}

  
  ngOnInit() {

    this.empresasService.getEmpresa().then((empresas) => {this.empresas = empresas});


    this.responsiveOptions = [ 
        {
            breakpoint: '1199px',
            numVisible: 6,
            numScroll: 3
        },
        {
            breakpoint: '991px',
            numVisible: 5,
            numScroll: 3
        },
        {
            breakpoint: '767px',
            numVisible: 4,
            numScroll: 2
        },
        {
            breakpoint: '500px',
            numVisible: 3,
            numScroll: 2
        },
        {
            breakpoint: '400px',
            numVisible: 2,
            numScroll: 2
        }
    ];
}
}
