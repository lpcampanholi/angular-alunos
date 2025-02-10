import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../types/usuario.type';
import { AlertDialogExcluirComponent } from '../../components/alert-dialog-excluir/alert-dialog-excluir.component';
import { BotaoComponent } from '../../components/botao/botao.component';
import { MensagemValidacaoComponent } from "../../components/mensagem-validacao/mensagem-validacao.component";
import { TituloPrincipalComponent } from '../../components/titulo-principal/titulo-principal.component';
import { LayoutPrincipalComponent } from "../../layouts/layout-principal/layout-principal.component";
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-detalhes-usuario',
  imports: [
    ReactiveFormsModule,
    TituloPrincipalComponent,
    BotaoComponent,
    AlertDialogExcluirComponent,
    LayoutPrincipalComponent,
    MensagemValidacaoComponent
],
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent {

  id: number | null = null;
  exibirModalExcluir: boolean = false;
  exclusaoConfirmada: boolean = false;

  formulario = new FormGroup({
    nome: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsuariosService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');
      if (idFromRoute) {
        this.id = Number(idFromRoute);
        this.buscar(this.id);
      }
    });
  }

  submeterForm() {
    if (this.formulario.valid) {
      if (this.id) {
        this.atualizar();
      } else {
        this.criar();
      }
    }
  }

  buscar(id: number) {
    this.service.buscarPorId(id).subscribe(estudante => {
      this.formulario.patchValue({
        nome: estudante.nome,
        email: estudante.email,
        senha: estudante.senha,
      });
    });
  }

  criar() {
    const novoUsuario: Usuario = {
      nome: this.formulario.get('nome')?.value,
      email: this.formulario.get('email')?.value,
      senha: this.formulario.get('senha')?.value,
      };
    this.service.criar(novoUsuario).subscribe(() => {
      this.router.navigate(['/usuarios']);
    });
  }

  atualizar() {
    const usuarioAtualizado: Usuario = {
      nome: this.formulario.get('nome')?.value,
      email: this.formulario.get('email')?.value,
      senha: this.formulario.get('senha')?.value,
    };
    this.service.atualizar(this.id, usuarioAtualizado).subscribe(() => {
      this.router.navigate(['/usuarios']);
    });
  }

  excluir() {
    if (this.id) {
      this.service.excluir(this.id).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  abrirModalExcluir() {
    this.exibirModalExcluir = true;
  }

  fecharModalExcluir() {
    this.exibirModalExcluir = false;
  }

  confirmarExclusao() {
    this.fecharModalExcluir();
    this.excluir();
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
