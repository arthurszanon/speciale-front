import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {AuthService} from '../../../services/auth.service';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    MessagesModule
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible: boolean = false;

  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  login() {
    const user = { email: this.email, senha: this.senha };
    this.authService.login(user).subscribe(response => {
      console.log(response);
      // Salve o token no localStorage
      this.authService.setToken(response.token);
      // Redirecione o usuário para a página protegida ou faça outras ações
      this.router.navigate(['/produtos']);
    }, error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Email ou senha incorretos' });
      // Mostre uma mensagem de erro para o usuário
    });
  }
}
