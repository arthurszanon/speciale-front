import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categorias } from '../interfaces/categorias';
import {environment} from '../../environments/environment';
import {MenuItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = environment.URL + '/bling/categorias';

  constructor(private http: HttpClient) { }

  getCategorias(page: number = 1, limit: number = 10) {
    const params = {
      page: page.toString(),
      limit: limit.toString()
    }
    return this.http.get<any>(this.url, {params});
  }

  getCategoriaById(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  categoriasParaMenu(categorias: categorias[]): MenuItem[] {
    const menu: MenuItem[] = [];

    // Mapear categorias por id de categoria pai
    const categoriasPorPai: Map<number, categorias[]> = new Map();

    // Agrupar categorias por categoria pai
    categorias.forEach(categoria => {
      const parentId = categoria.categoriaPai.id;

      if (!categoriasPorPai.has(parentId)) {
        categoriasPorPai.set(parentId, []);
      }

      categoriasPorPai.get(parentId)?.push(categoria);
    });

    // Função recursiva para construir os subitens de um MenuItem
    function construirMenu(categorias: categorias[]): MenuItem[] {
      return categorias.map(categoria => ({
        id: categoria.id.toString(),
        label: categoria.descricao,
        // routerLink: '/produtos/' + categoria.id,
        routerLink: ['/produtos', categoria.id],
        items: categoriasPorPai.has(categoria.id) ? construirMenu(categoriasPorPai.get(categoria.id) || []) : []
      }));
    }

    // Criar o menu a partir das categorias agrupadas
    categoriasPorPai.forEach((categorias, parentId) => {
      if (parentId === 0) {
        menu.push(...construirMenu(categorias));
      }
    });

    return menu;
  }

}
