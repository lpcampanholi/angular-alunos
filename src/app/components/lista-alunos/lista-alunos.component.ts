import { RouterModule } from '@angular/router';
import { Aluno } from '../../../types/aluno';
import { AlunosService } from '../../services/aluno.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from "../botao-adicionar/botao-adicionar.component";

@Component({
  selector: 'app-lista-alunos',
  imports: [FormsModule, RouterModule, CommonModule, BotaoAdicionarComponent],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {

  alunos: Aluno[] = [];
  itensPorPagina: number[] = [10, 20, 30];
  itensPorPaginaSelecionado = 20;
  paginaAtual = 1;
  ultimaPagina = 0;
  campoDeOrdenacao = 'nomeCompleto';
  srcSetaOrdenacao = '';

  setasOrdenacao = {
    id: '',
    nomeCompleto: 'assets/expand-arrow.png',
    responsavelNome: ''
  };

  ordem = {
    id: 'asc',
    nomeCompleto: 'asc',
    responsavelNome: 'asc'
  };

  constructor(private service: AlunosService) { }

  ngOnInit(): void {
    this.listarAlunosPrimeiraPagina();
  }

  listarAlunosPrimeiraPagina() {
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual,this.itensPorPaginaSelecionado, this.campoDeOrdenacao).subscribe((listaAlunos) => {
      this.alunos = listaAlunos.data;
      this.ultimaPagina = listaAlunos.last;
    })
  }

  listarAlunosProximaPagina() {
    if (this.paginaAtual < this.ultimaPagina) {
      this.paginaAtual++;
      this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado, this.campoDeOrdenacao).subscribe((listaAlunos) => {
        this.alunos = listaAlunos.data;
      });
    }
  }

  listarAlunosPaginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado, this.campoDeOrdenacao).subscribe((listaAlunos) => {
        this.alunos = listaAlunos.data;
      })
    }
  }

  listarAlunosUltimaPagina() {
    this.paginaAtual = this.ultimaPagina;
    this.service.listar(this.paginaAtual, this.itensPorPaginaSelecionado, this.campoDeOrdenacao).subscribe((listaAlunos) => {
      this.alunos = listaAlunos.data;
    })
  }

  alterarCampoDeOrdenacao(campo: string) {
    if (this.campoDeOrdenacao === campo || this.campoDeOrdenacao === `-${campo}`) {
      this.ordem[campo] = this.ordem[campo] === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordem[campo] = 'asc';
    }

    this.campoDeOrdenacao = this.ordem[campo] === 'asc' ? campo : `-${campo}`;

    Object.keys(this.setasOrdenacao).forEach(key => {
      if (key === campo) {
        this.setasOrdenacao[key] = this.ordem[key] === 'asc' ? 'assets/expand-arrow.png' : 'assets/collapse-arrow.png';
      } else {
        this.setasOrdenacao[key] = '';
      }
    });

    this.listarAlunosPrimeiraPagina();
  }

}
