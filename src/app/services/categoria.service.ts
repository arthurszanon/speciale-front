import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { categorias } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly APIcategory = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) { }
  list () {
    return this.http.get<[categorias]>(this.APIcategory)
      .pipe(
        tap(console.log)
      );
  }
}
