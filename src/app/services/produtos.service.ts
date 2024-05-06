import { Injectable } from '@angular/core';
import { produtos } from '../interfaces/produtos';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly APIproducts = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }
  list () {
    return this.http.get<[produtos]>(this.APIproducts)
      .pipe(
        tap(console.log)
      );
  }
  getById (id: number) {
    return this.list()
              .toPromise()
              .then((response: [produtos]) => response.find((item: produtos) => item.id === id));
  }
}

