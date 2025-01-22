import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../services/aluno.service';
import { TituloPrincipalComponent } from "../titulo-principal/titulo-principal.component";
import { Aluno } from '../../../types/aluno';
import { BotaoComponent } from "../botao/botao.component";
import { AlertDialogExcluirComponent } from "../alert-dialog-excluir/alert-dialog-excluir.component";
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../types/parentesco';

@Component({
  selector: 'app-detalhes-aluno',
  imports: [ReactiveFormsModule, TituloPrincipalComponent, BotaoComponent, AlertDialogExcluirComponent],
  templateUrl: './detalhes-aluno.component.html',
  styleUrl: './detalhes-aluno.component.css'
})
export class DetalhesAlunoComponent {

  id: number | string | null = null;
  exibirModalExcluir: boolean = false;
  parentescos: Parentesco[] = [];

  formulario = new FormGroup({
    nomeCompleto: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    responsavelNome: new FormControl('', Validators.required),
    parentescoResponsavel: new FormControl(this.parentescos[2]),
    whatsappResponsavel: new FormControl('', Validators.required)
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
  }

  buscarAluno(id: number | string) {
    this.alunosService.buscarPorId(id).subscribe(aluno => {
      this.formulario.patchValue(aluno);
    });
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
        console.log("excluiu");
        this.router.navigate(['/alunos']);
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
    this.excluirAluno();
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }

  buscarParentescos() {
    this.paretescosService.listarParentescos().subscribe((listaParentescos) => {
      this.parentescos = listaParentescos;
    });
  }

}
