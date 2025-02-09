import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class autenticadoGuard implements CanActivate {

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
  ) {}

  canActivate(): boolean {
    const usuarioAutenticado = this.autenticacaoService.estaLogado();
    if (!usuarioAutenticado) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
