import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudante } from '../../types/estudante.type';
import { ListaPaginada } from '../../types/lista-paginada.type';

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {

  private readonly api = "http://localhost:3000/estudantes";

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Estudante> {
    const url = `${this.api}/${id}`;
    return this.http.get<Estudante>(url);
  }

  listar(pagina: number, limite: number, ordenarPor: string): Observable<ListaPaginada<Estudante>> {
    const params = new HttpParams()
      .set("pagina", pagina)
      .set("limite", limite)
      .set("ordenarPor", ordenarPor);
    return this.http.get<ListaPaginada<Estudante>>(this.api, { params });
  }

  criar(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(this.api, estudante);
  }

  atualizar(id: number, estudante: Estudante): Observable<Estudante> {
    const url = `${this.api}/${id}`;
    return this.http.put<Estudante>(url, estudante);
  }

  excluir(id: number): Observable<Estudante> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Estudante>(url);
  }

}
