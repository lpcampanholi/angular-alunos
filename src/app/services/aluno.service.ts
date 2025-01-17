import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../../types/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly api = "http://localhost:3000/alunos";

  constructor(private http: HttpClient) { }

  buscarUmAluno(id: number): Observable<Aluno> {
    const url = `${this.api}/${id}`;
    return this.http.get<Aluno>(this.api);
  }

  listar(pagina: number, itensPorPagina: number): Observable<Aluno[]> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina);
    return this.http.get<Aluno[]>(this.api, { params });
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.api, aluno);
  }

  atualizar(id: number, aluno: Aluno): Observable<Aluno> {
    const url = `${this.api}/${id}`;
    return this.http.put<Aluno>(this.api, aluno);
  }

  excluir(id: number): Observable<Aluno> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Aluno>(url);
  }
}
