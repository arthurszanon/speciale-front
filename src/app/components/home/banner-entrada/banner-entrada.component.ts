import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-banner-entrada',
  standalone: true,
  imports: [
    ButtonModule, 
    ImageModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './banner-entrada.component.html',
  styleUrl: './banner-entrada.component.css'
})
export class BannerEntradaComponent {

}
