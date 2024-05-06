import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    BreadcrumbModule,
    InputTextModule,
    FormsModule,
    InputMaskModule,
    ButtonModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  texto!: string;
  telefone: string | undefined;
  cep: string | undefined;



  items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Electronics' }, 
            { label: 'Computer' }, 
            { label: 'Accessories' },
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}