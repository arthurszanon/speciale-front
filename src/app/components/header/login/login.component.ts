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
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    MessagesModule,
    FloatLabelModule,
    PasswordModule,
    ToastModule,
    NgIf,
    ProgressSpinnerModule
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible: boolean = false;

  email: string = '';
  senha: string = '';

  loading: boolean = false;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  login() {
    this.loading = true;
    const user = { email: this.email, senha: this.senha };
    this.authService.login(user).subscribe(response => {
      this.loading = false;
      console.log(response);
      // Salve o token no localStorage
      this.authService.setToken(response.token);
      // Redirecione o usuário para a página protegida ou faça outras ações
      this.router.navigate(['/produtos']);
    }, error => {
      this.loading = false;
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Email ou senha incorretos' });
      // Mostre uma mensagem de erro para o usuário
    });
  }
}

