import {Injectable, signal} from '@angular/core';
import { produto } from '../interfaces/produto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Orcamento} from '../interfaces/orcamento';
import { saveAs } from 'file-saver';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private readonly url = environment.URL + '/orcamento';

  constructor(private http: HttpClient) { }

  getOrcamentoPdf(orcamento: Orcamento) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(`${this.url}/pdf`, orcamento, {headers, responseType: 'blob'});
  }
}

