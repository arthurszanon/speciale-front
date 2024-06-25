import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {NgClass, NgIf} from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import {AuthService} from '../../../services/auth.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    FormsModule,
    ToastModule,
    NgIf,
    ProgressSpinnerModule
  ],
  providers: [AuthService, MessageService],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  user: any = {
    email: '',
    senha: '',
    nome: '',
    telefone: '',
    confirmarSenha: ''
  }
  loading: boolean = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  cadastrar() {

    if(!this.user.email || !this.user.senha || !this.user.nome || !this.user.telefone) {
      console.log(this.user)
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
      return;
    }

    if(this.user.senha !== this.user.confirmarSenha) {
      console.log(this.user)
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas não coincidem' });
      return;
    }

    this.loading = true;
    this.authService.register(this.user).subscribe(response => {
      console.log(response);
      this.loading = false;
      // Salve o token no localStorage
      this.authService.setToken(response.token);
      // Redirecione o usuário para a página protegida ou faça outras ações
      this.router.navigate(['/produtos']);
    }, error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar usuário' });
      this.loading = false;
      // Mostre uma mensagem de erro para o usuário
    });
  }

}
