import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudante } from '../../../types/estudante.type';
import { Parentesco } from '../../../types/parentesco.type';
import { AlertDialogExcluirComponent } from '../../components/alert-dialog-excluir/alert-dialog-excluir.component';
import { BotaoSecundarioComponent } from '../../components/botao-secundario/botao-secundario.component';
import { BotaoComponent } from '../../components/botao/botao.component';
import { MensagemValidacaoComponent } from "../../components/mensagem-validacao/mensagem-validacao.component";
import { ModalParentescoComponent } from '../../components/modal-parentesco/modal-parentesco.component';
import { TituloPrincipalComponent } from '../../components/titulo-principal/titulo-principal.component';
import { LayoutPrincipalComponent } from "../../layouts/layout-principal/layout-principal.component";
import { EstudantesService } from '../../services/estudantes.service';
import { ParentescosService } from '../../services/parentescos.service';
import { CampoTextoComponent } from "../../components/campo-texto/campo-texto.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes-estudante',
  imports: [
    ReactiveFormsModule,
    TituloPrincipalComponent,
    BotaoComponent,
    AlertDialogExcluirComponent,
    ModalParentescoComponent,
    BotaoSecundarioComponent,
    LayoutPrincipalComponent,
    MensagemValidacaoComponent,
    // CampoTextoComponent,
  ],
  templateUrl: './detalhes-estudante.component.html',
  styleUrls: ['./detalhes-estudante.component.css']
})
export class DetalhesEstudanteComponent {

  id: number | null = null;
  exibirModalExcluir: boolean = false;
  parentescos: Parentesco[] = [];
  parentescoSelecionado: Parentesco | null = null;
  modalCadastroAberto: boolean = false;
  exclusaoConfirmada: boolean = false;

  formulario = new FormGroup({
    nomeCompleto: new FormControl<string>('', Validators.required),
    endereco: new FormControl<string>('', Validators.required),
    bairro: new FormControl<string>('', Validators.required),
    responsavel: new FormControl<string>('', Validators.required),
    parentescoId: new FormControl<number | null>(null, Validators.required),
    whatsapp: new FormControl<string>('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudantesService: EstudantesService,
    private paretescosService: ParentescosService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');
      if (idFromRoute) {
        this.id = Number(idFromRoute);
        this.buscarEstudante(this.id);
      }
    });
    this.buscarParentescos();
  }

  submeterForm() {
    if (this.formulario.valid) {
      if (this.id) {
        this.atualizarEstudante();
      } else {
        this.criarEstudante();
      }
    }
  }

  buscarEstudante(id: number) {
    this.estudantesService.buscarPorId(id).subscribe(estudante => {
      this.formulario.patchValue({
        nomeCompleto: estudante.nomeCompleto,
        endereco: estudante.endereco,
        bairro: estudante.bairro,
        responsavel: estudante.responsavel,
        parentescoId: estudante.parentesco.id,
        whatsapp: estudante.whatsapp
      });
    });
  }

  criarEstudante() {
    const novoEstudante: Estudante = {
      nomeCompleto: this.formulario.get('nomeCompleto')?.value,
      endereco: this.formulario.get('endereco')?.value,
      bairro: this.formulario.get('bairro')?.value,
      responsavel: this.formulario.get('responsavel')?.value,
      parentesco: { id: this.formulario.get('parentescoId')?.value } as Parentesco,
      whatsapp: this.formulario.get('whatsapp')?.value,
    };
    this.estudantesService.criar(novoEstudante).subscribe({
      next: () => {
        this.toastService.success('Estudante criado');
        this.router.navigate(['/estudantes']);
      },
      error: (err) => {
        if (Array.isArray(err.error?.message)) {
          err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
        } else {
          const mensagemErro = err.error?.message || 'Erro ao criar estudante';
          this.toastService.error(mensagemErro);
        }
      },
    });
  }

  atualizarEstudante() {
    const estudanteAtualizado: Estudante = {
      nomeCompleto: this.formulario.get('nomeCompleto')?.value,
      endereco: this.formulario.get('endereco')?.value,
      bairro: this.formulario.get('bairro')?.value,
      responsavel: this.formulario.get('responsavel')?.value,
      parentesco: { id: this.formulario.get('parentescoId')?.value } as Parentesco,
      whatsapp: this.formulario.get('whatsapp')?.value,
    };
    this.estudantesService.atualizar(this.id, estudanteAtualizado).subscribe({
      next: () => {
        this.toastService.success('Estudante atualizado');
        this.router.navigate(['/estudantes']);
      },
      error: (err) => {
        if (Array.isArray(err.error?.message)) {
          err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
        } else {
          const mensagemErro = err.error?.message || 'Erro ao atualizar estudante';
          this.toastService.error(mensagemErro);
        }
      },
    });
  }

  excluirEstudante() {
    if (this.id) {
      this.estudantesService.excluir(this.id).subscribe({
        next: () => {
          this.toastService.success('Estudante excluído');
          this.router.navigate(['/estudantes']);
        },
        error: (err) => {
          if (Array.isArray(err.error?.message)) {
            err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
          } else {
            const mensagemErro = err.error?.message || 'Erro ao excluir estudante';
            this.toastService.error(mensagemErro);
          }
        },
      });
    }
  }

  buscarParentescos() {
    this.paretescosService.listar().subscribe((listaParentescos) => {
      this.parentescos = listaParentescos;
    });
  }

  selecionarParentesco(id: number) {
    this.parentescoSelecionado = this.parentescos.find(parentesco => parentesco.id === id);
  }

  onParentescoChange(evento: Event) {
    const idSelecionado = (evento.target as HTMLSelectElement).value.split(" ")[1];
    this.selecionarParentesco(Number(idSelecionado));
  }

  abrirModalExcluir() {
    this.exibirModalExcluir = true;
  }

  fecharModalExcluir() {
    this.exibirModalExcluir = false;
  }

  confirmarExclusao() {
    this.fecharModalExcluir();
    this.excluirEstudante();
  }

  fecharModalCadastro() {
    this.modalCadastroAberto = false;
    this.buscarParentescos();
  }

  abrirModalCadastroEditar(event: Event) {
    event.preventDefault();
    this.selecionarParentesco(this.formulario.get('parentescoId')?.value);
    this.modalCadastroAberto = true;
  }

  abrirModalCadastroNovo(event: Event) {
    event.preventDefault();
    this.parentescoSelecionado = null;
    this.modalCadastroAberto = true;
  }

  cancelar() {
    this.router.navigate(['/estudantes']);
  }

  get podeEditarParentesco(): boolean {
    const idSelecionado = this.formulario.get('parentescoId')?.value;
    const parentesco = this.parentescos.find((p) => p.id === idSelecionado);
    return !!parentesco?.nome;
  }

}
