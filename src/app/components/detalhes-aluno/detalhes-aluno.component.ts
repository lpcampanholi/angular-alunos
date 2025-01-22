import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../services/aluno.service';
import { TituloPrincipalComponent } from "../titulo-principal/titulo-principal.component";
import { Aluno } from '../../../types/aluno';
import { BotaoComponent } from "../botao/botao.component";

@Component({
  selector: 'app-detalhes-aluno',
  imports: [ReactiveFormsModule, TituloPrincipalComponent, BotaoComponent],
  templateUrl: './detalhes-aluno.component.html',
  styleUrl: './detalhes-aluno.component.css'
})
export class DetalhesAlunoComponent {

  idAluno: number | null = null;

  formulario = new FormGroup({
    nomeCompleto: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    responsavelNome: new FormControl('', Validators.required),
    parentescoResponsavel: new FormControl('', Validators.required),
    whatsappResponsavel: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AlunosService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.idAluno = id;
      if (id) {
        this.buscarAluno(id);
      }
    });
  }

  buscarAluno(id: number) {
    this.service.buscarPorId(id).subscribe(aluno => {
      this.formulario.patchValue(aluno);
    });
  }

  submeterForm() {
    if (this.formulario.valid) {
      if (this.idAluno) {
        this.atualizarAluno();
      } else {
        this.criarAluno();
      }
    }
  }

  criarAluno() {
    const novoAluno: Aluno = this.formulario.value as Aluno;
    this.service.criar(novoAluno).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  atualizarAluno() {
    const alunoAtualizado: Aluno = {
      id: this.idAluno,
      ...this.formulario.value
    } as Aluno
    this.service.atualizar(alunoAtualizado).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  excluirAluno() {
    if (this.idAluno) {
      this.service.excluir(this.idAluno).subscribe(() => {
        this.router.navigate(['/alunos']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }

}
