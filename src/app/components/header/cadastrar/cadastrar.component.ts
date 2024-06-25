import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgClass } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    NgClass,
    MessagesModule,
    FloatLabelModule,
    PasswordModule,
    InputMaskModule,
    FormsModule
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  cep: number | undefined;
  numero: string | undefined;
  telefone: number | undefined;


}
