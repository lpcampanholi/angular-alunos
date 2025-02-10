import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Estudante } from '../../../types/estudante.type';
import { EstudantesService } from '../../services/estudantes.service';

@Component({
  selector: 'app-lista-estudantes',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './lista-estudantes.component.html',
  styleUrl: './lista-estudantes.component.css'
})
export class ListaEstudantesComponent {

  estudantes: Estudante[] = [];
  limite: number[] = [10, 20, 30];
  limiteSelecionado = 10;
  paginaAtual = 1;
  ultimaPagina = 0;
  campoDeOrdenacao = 'nomeCompleto';
  srcSetaOrdenacao = '';

  setasOrdenacao = {
    id: '',
    nomeCompleto: 'assets/expand-arrow.png',
    responsavel: ''
  };

  ordem = {
    id: 'asc',
    nomeCompleto: 'asc',
    responsavel: 'asc'
  };

  constructor(private service: EstudantesService) { }

  ngOnInit(): void {
    this.listarEstudantesPrimeiraPagina();
  }

  listarEstudantesPrimeiraPagina() {
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
      this.estudantes = listaEstudantes.data;
      this.ultimaPagina = listaEstudantes.last;
    })
  }

  listarEstudantesProximaPagina() {
    if (this.paginaAtual < this.ultimaPagina) {
      this.paginaAtual++;
      this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
        this.estudantes = listaEstudantes.data;
      });
    }
  }

  listarEstudantesPaginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
        this.estudantes = listaEstudantes.data;
      })
    }
  }

  listarEstudantesUltimaPagina() {
    this.paginaAtual = this.ultimaPagina;
    this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
      this.estudantes = listaEstudantes.data;
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

    this.listarEstudantesPrimeiraPagina();
  }

}
