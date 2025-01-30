import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudantesService } from '../../services/estudantes.service';
import { Estudante } from '../../../models/estudante';
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../models/parentesco';
import { TituloPrincipalComponent } from '../../shared/titulo-principal/titulo-principal.component';
import { BotaoComponent } from '../../shared/botao/botao.component';
import { AlertDialogExcluirComponent } from '../../components/alert-dialog-excluir-estudante/alert-dialog-excluir.component';
import { ModalCadastroParentescoComponent } from '../../components/modal-cadastro-parentesco/modal-cadastro-parentesco.component';
import { BotaoSecundarioComponent } from '../../shared/botao-secundario/botao-secundario.component';


@Component({
  selector: 'app-detalhes-aluno',
  imports: [
    ReactiveFormsModule,
    TituloPrincipalComponent,
    BotaoComponent,
    AlertDialogExcluirComponent,
    ModalCadastroParentescoComponent,
    BotaoSecundarioComponent
  ],
  templateUrl: './detalhes-estudante.component.html',
  styleUrl: './detalhes-estudante.component.css'
})
export class DetalhesEstudanteComponent {

  id: string | null = null;
  exibirModalExcluir: boolean = false;
  parentescos: Parentesco[] = [];
  parentescoSelecionado: Parentesco | null = null;
  modalCadastroAberto: boolean = false;
  exclusaoConfirmada: boolean = false;

  formulario = new FormGroup({
    nomeCompleto: new FormControl<string>('', Validators.required),
    endereco: new FormControl<string>('', Validators.required),
    bairro: new FormControl<string>('', Validators.required),
    responsavelNome: new FormControl<string>('', Validators.required),
    parentescoResponsavelId: new FormControl<string>(null, Validators.required),
    whatsappResponsavel: new FormControl<string>('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudantesService: EstudantesService,
    private paretescosService: ParentescosService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
      if (id) {
        this.buscarEstudante(id);
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

  buscarEstudante(id: string) {
    this.estudantesService.buscarPorId(id).subscribe(aluno => {
      this.formulario.patchValue({
        ...aluno,
        parentescoResponsavelId: aluno.parentescoResponsavelId
      });
    });
  }

  criarEstudante() {
    const novoAluno: Estudante = this.formulario.value as Estudante;
    this.estudantesService.criar(novoAluno).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  atualizarEstudante() {
    const alunoAtualizado: Estudante = {
      id: this.id,
      ...this.formulario.value
    } as Estudante
    this.estudantesService.atualizar(alunoAtualizado).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  excluirEstudante() {
    if (this.id) {
      this.estudantesService.excluir(this.id).subscribe(() => {
        this.router.navigate(['/alunos']);
      });
    }
  }

  buscarParentescos() {
    this.paretescosService.listar().subscribe((listaParentescos) => {
      this.parentescos = listaParentescos;
    });
  }

  selecionarParentesco(id: string) {
    this.parentescoSelecionado = this.parentescos.find(parentesco => parentesco.id === id);
  }

  onParentescoChange(evento: Event) {
    const idSelecionado = (evento.target as HTMLSelectElement).value.split(" ")[1];
    this.selecionarParentesco(idSelecionado);
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
    this.selecionarParentesco(this.formulario.get('parentescoResponsavelId')?.value);
    this.modalCadastroAberto = true;
  }

  abrirModalCadastroNovo(event: Event) {
    event.preventDefault();
    this.parentescoSelecionado = null;
    this.modalCadastroAberto = true;
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }

  get podeEditarParentesco(): boolean {
    const idSelecionado = this.formulario.get('parentescoResponsavelId')?.value;
    const parentesco = this.parentescos.find((p) => p.id === idSelecionado);
    return !!parentesco?.nome;
  }

}
