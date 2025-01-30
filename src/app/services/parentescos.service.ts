import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parentesco } from '../../models/parentesco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentescosService {

  private api = 'http://localhost:3000/parentescos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Parentesco[]> {
    return this.http.get<Parentesco[]>(this.api);
  }

  criar(parentesco: Parentesco): Observable<Parentesco> {
    return this.http.post<Parentesco>(this.api, parentesco);
  }

  atualizar(parentesco: Parentesco): Observable<Parentesco> {
    const url = `${this.api}/${parentesco.id}`;
    return this.http.put<Parentesco>(url, parentesco);
  }

  excluir(id: string): Observable<Parentesco> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Parentesco>(url);
  }

}
