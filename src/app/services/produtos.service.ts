import { Injectable } from '@angular/core';
import { produto } from '../interfaces/produto';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly url = environment.URL + '/bling/produtos';

  constructor(private http: HttpClient) { }

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

