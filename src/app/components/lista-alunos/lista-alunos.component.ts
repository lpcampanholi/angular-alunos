import { RouterModule } from '@angular/router';
import { Aluno } from '../../../types/aluno';
import { AlunosService } from '../../services/aluno.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotaoDestaqueComponent } from '../botao-destaque/botao-destaque.component';

@Component({
  selector: 'app-lista-alunos',
  imports: [FormsModule, RouterModule, BotaoDestaqueComponent],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {

  alunos: Aluno[] = [];
  itensPorPagina: number[] = [10, 20, 30];
  itensPorPaginaSelecionado = 20;
  paginaAtual = 1;
  ultimaPagina = 0;

  constructor(private service: AlunosService) { }

  ngOnInit(): void {
    this.listarAlunosPrimeiraPagina();
  }

  listarAlunosPrimeiraPagina() {
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado).subscribe((listaAlunos) => {
      this.alunos = listaAlunos.data;
      this.ultimaPagina = listaAlunos.last;
    })
  }

  listarAlunosProximaPagina() {
    if (this.paginaAtual < this.ultimaPagina) {
      this.paginaAtual++;
      this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado).subscribe((listaAlunos) => {
        this.alunos = listaAlunos.data;
      });
    }
  }

  listarAlunosPaginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado).subscribe((listaAlunos) => {
        this.alunos = listaAlunos.data;
      })
    }
  }

  listarAlunosUltimaPagina() {
    this.paginaAtual = this.ultimaPagina;
    this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado).subscribe((listaAlunos) => {
      this.alunos = listaAlunos.data;
    })
  }

}
