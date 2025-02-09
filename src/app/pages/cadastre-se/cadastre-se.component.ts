import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutAutenticacaoComponent } from "../../layouts/layout-autenticacao/layout-autenticacao.component";
import { UsuariosService } from '../../services/usuarios.service';
import { BotaoComponent } from '../../components/botao/botao.component';
import { Usuario } from '../../../types/usuario.type';

@Component({
  selector: 'app-formulario-cadastre-se',
  imports: [
    ReactiveFormsModule,
    BotaoComponent,
    LayoutAutenticacaoComponent,
    RouterModule,
  ],
  templateUrl: './cadastre-se.component.html',
  styleUrls: ['./cadastre-se.component.css']
})
export class CadastreseComponent {

  formulario = new FormGroup({
    nome: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
  });

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private usuarioService: UsuariosService,
  ) { }

  submeterForm() {
    const novoUsuario: Usuario = {
      nome: this.formulario.value.nome,
      email: this.formulario.value.email,
      senha: this.formulario.value.senha
    }
    this.usuarioService.criar(novoUsuario).subscribe(
      {
        next: () => {
          this.toastService.success("Usuário cadastrado com sucesso!");
          this.router.navigate(['/login']);
        },
        error: () => this.toastService.error("Algo deu errado."),
      });
  }

}
