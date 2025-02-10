import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../../types/login-response.type';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { CredenciaisLogin } from '../../types/login-credenciais.type';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly api = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  login(credenciais: CredenciaisLogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.api}/login`, credenciais).pipe(
      tap((value) => {
        localStorage.setItem('auth-token', value.token);
        localStorage.setItem('username', value.nome);
      }));
  }

  deslogar() {
    localStorage.clear();
  }

  verificaSessao(): Observable<boolean> {
    return this.http.get(`${this.api}/me`).pipe(
      map(() => true),
      catchError(() => {
        this.deslogar();
        return of(false);
      })
    )
  }

}
