import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../services/aluno.service';
import { Aluno } from '../../../types/aluno';
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../types/parentesco';
import { TituloPrincipalComponent } from '../../shared/titulo-principal/titulo-principal.component';
import { BotaoComponent } from '../../shared/botao/botao.component';
import { AlertDialogExcluirComponent } from '../../components/alert-dialog-excluir-aluno/alert-dialog-excluir.component';
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
  templateUrl: './detalhes-aluno.component.html',
  styleUrl: './detalhes-aluno.component.css'
})
export class DetalhesAlunoComponent {

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
    private alunosService: AlunosService,
    private paretescosService: ParentescosService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
      if (id) {
        this.buscarAluno(id);
      }
    });
    this.buscarParentescos();
  }

  submeterForm() {
    if (this.formulario.valid) {
      if (this.id) {
        this.atualizarAluno();
      } else {
        this.criarAluno();
      }
    }
  }

  buscarAluno(id: string) {
    this.alunosService.buscarPorId(id).subscribe(aluno => {
      this.formulario.patchValue({
        ...aluno,
        parentescoResponsavelId: aluno.parentescoResponsavelId
      });
    });
  }

  criarAluno() {
    const novoAluno: Aluno = this.formulario.value as Aluno;
    this.alunosService.criar(novoAluno).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  atualizarAluno() {
    const alunoAtualizado: Aluno = {
      id: this.id,
      ...this.formulario.value
    } as Aluno
    this.alunosService.atualizar(alunoAtualizado).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  excluirAluno() {
    if (this.id) {
      this.alunosService.excluir(this.id).subscribe(() => {
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
    this.excluirAluno();
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
