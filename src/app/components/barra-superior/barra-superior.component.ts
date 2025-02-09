import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-barra-superior',
  imports: [RouterModule],
  templateUrl: './barra-superior.component.html',
  styleUrl: './barra-superior.component.css'
})
export class BarraSuperiorComponent {
  nomeUsuario: string = 'username';

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    const nomeUsuarioService = this.usuarioService.obterNomeUsuario();
    if (nomeUsuarioService) {
      this.nomeUsuario = nomeUsuarioService;
    } else {
      this.nomeUsuario = 'Username';
    }

  }

  encerrarSessao() {
    this.autenticacaoService.deslogar();
    this.router.navigate(['/login']);
  }

}
