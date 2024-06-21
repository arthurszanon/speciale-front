import {Injectable, signal} from '@angular/core';
import { produto } from '../interfaces/produto';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly url = environment.URL + '/bling/produtos';

  constructor(private http: HttpClient) { }

  addToCart(product: produto) {
    const cart = localStorage.getItem('cart');
    let cartArray = cart ? JSON.parse(cart) : [];
    const index = cartArray.findIndex((p: produto) => p.id === product.id);
    if (index === -1) {
      cartArray.push(product);
    } else {
      cartArray[index].quantidade += product.quantidade;
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }

  removeFromCart(product: produto) {
    const cart = localStorage.getItem('cart');
    let cartArray = cart ? JSON.parse(cart) : [];
    const index = cartArray.findIndex((p: produto) => p.id === product.id);
    if (index !== -1) {
      cartArray.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }

  getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  getProdutos(page: number = 1, limit: number = 10) {
    const params = {
      page: page.toString(),
      limit: limit.toString()
    }
    return this.http.get<any>(this.url, {params});
  }

  getProdutoById(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getProdutosByCategoria(categoriaId: string) {
    return this.http.get<any>(`${this.url}/categoria/${categoriaId}`);
  }
}

