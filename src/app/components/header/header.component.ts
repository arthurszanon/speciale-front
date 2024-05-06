import { Component,  OnInit  } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../../services/categoria.service';
import { categorias } from '../../interfaces/categorias';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [ CategoriaService ]
})
export class HeaderComponent implements OnInit{
  items: categorias[] = [];
  constructor (private service: CategoriaService) {}

  ngOnInit() {
    this.service.list()
    .subscribe(dados => this.items = dados);
}
}
