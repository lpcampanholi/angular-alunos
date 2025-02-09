import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../types/usuario.type';
import { ListaPaginada } from '../../types/lista-paginada.type';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly api = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Usuario> {
    const url = `${this.api}/${id}`;
    return this.http.get<Usuario>(url);
  }

  listar(pagina: number, limite: number, ordenarPor: string): Observable<ListaPaginada<Usuario>> {
    const params = new HttpParams()
      .set("pagina", pagina)
      .set("limite", limite)
      .set("ordenarPor", ordenarPor);
    return this.http.get<ListaPaginada<Usuario>>(this.api, { params });
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.api, usuario);
  }

  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    const url = `${this.api}/${id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  excluir(id: number): Observable<Usuario> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Usuario>(url);
  }

  obterNomeUsuario(): string {
    return localStorage.getItem('username');
  }

}
