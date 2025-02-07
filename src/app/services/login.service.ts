import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../../types/login-response.type';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {

  private readonly api = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.api}/login`, { email, senha }).pipe(
      tap((value) => {
      sessionStorage.setItem('auth-token', value.token);
      sessionStorage.setItem('username', value.name);
    }));
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
  }
}
