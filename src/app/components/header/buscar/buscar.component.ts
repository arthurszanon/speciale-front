import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgClass } from '@angular/common';
import {ProdutosService} from '../../../services/produtos.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  providers: [ProdutosService],
  imports: [
    ButtonModule,
    InputTextModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  visible: boolean = false;
  nome: string = '';

  constructor(private produtoService: ProdutosService, private router: Router) {}

  showDialog() {
      this.visible = true;
  }

  search() {
    this.produtoService.getProdutosByNome(this.nome).subscribe((data: any) => {
      this.router.navigate(['/produtos/nome/' + this.nome]);
      this.visible = false;
    });
  }
}
