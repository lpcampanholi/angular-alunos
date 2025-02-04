import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.api);
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

}
