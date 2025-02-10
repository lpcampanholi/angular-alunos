import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class autenticadoGuard implements CanActivate {

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
  ) { }

  canActivate(): Observable<boolean> {
    return this.autenticacaoService.verificaSessao().pipe(
      tap((usuarioAutenticado) => {
        if (!usuarioAutenticado) {
          this.router.navigate(['/login']);
        }
      }),
      map((usuarioAutenticado) => usuarioAutenticado)
    );
  }
}
