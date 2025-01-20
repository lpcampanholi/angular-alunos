import { Component } from '@angular/core';
import { Aluno } from '../../../types/aluno';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../services/aluno.service';
import { BotaoDestaqueComponent } from '../botao-destaque/botao-destaque.component';

@Component({
  selector: 'app-detalhes-aluno',
  imports: [FormsModule, BotaoDestaqueComponent],
  templateUrl: './detalhes-aluno.component.html',
  styleUrl: './detalhes-aluno.component.css'
})
export class DetalhesAlunoComponent {

  aluno: Aluno = {
    id: 0,
    nomeCompleto: "",
    endereco: "",
    bairro: "",
    responsavelNome: "",
    parentescoResponsavel: "",
    whatsappResponsavel: ""
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AlunosService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.buscarAluno(id);
      }
    });
  }

  submeterForm() {
    if (this.aluno.id) {
      this.atualizarAluno(this.aluno);
    } else {
      this.criarAluno(this.aluno);
    }
  }

  buscarAluno(id: number) {
    this.service.buscarPorId(id).subscribe(aluno => {
      this.aluno = aluno;
    });
  }

  criarAluno(novoAluno: Aluno) {
    this.service.criar(novoAluno).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  atualizarAluno(aluno: Aluno) {
    this.service.atualizar(aluno).subscribe(() => {
      this.router.navigate(['/alunos']);
    });
  }

  excluirAluno() {
    this.service.excluir(this.aluno.id).subscribe(() => {
      this.router.navigate(['/alunos']);
    })
  }

}
