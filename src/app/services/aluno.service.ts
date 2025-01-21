import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlunoPaginado } from '../../types/aluno-paginado';
import { Aluno } from '../../types/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly api = "http://localhost:3000/alunos";

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Aluno> {
    const url = `${this.api}/${id}`;
    return this.http.get<Aluno>(url);
  }

  listar(pagina: number, itensPorPagina: number, campoDeOrdenacao: string): Observable<AlunoPaginado> {
    const params = new HttpParams()
      .set("_page", pagina)
      .set("_per_page", itensPorPagina)
      .set("_sort", campoDeOrdenacao);
    return this.http.get<AlunoPaginado>(this.api, { params });
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.api, aluno);
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    const url = `${this.api}/${aluno.id}`;
    return this.http.put<Aluno>(url, aluno);
  }

  excluir(id: number): Observable<Aluno> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Aluno>(url);
  }

}
