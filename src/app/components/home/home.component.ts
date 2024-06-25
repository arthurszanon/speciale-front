import { Component, NgModule } from '@angular/core';
import { CarouselModelComponent } from '../products/carousel-model/carousel-model.component';
import { GalleriaBannerComponent } from './galleria-banner/galleria-banner.component';
import { CommonModule } from '@angular/common';
import { BannerEntradaComponent } from './banner-entrada/banner-entrada.component';
import { QuemsomosComponent } from "./quemsomos/quemsomos.component";
import { CarouselhomeComponent } from "./carouselhome/carouselhome.component";
import { ReferenciasComponent } from "./referencias/referencias.component";
import { MapsComponent } from "./maps/maps.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        CarouselModelComponent,
        GalleriaBannerComponent,
        CommonModule,
        BannerEntradaComponent,
        QuemsomosComponent,
        CarouselhomeComponent,
        ReferenciasComponent,
        MapsComponent
    ]
})

export class HomeComponent {

}
