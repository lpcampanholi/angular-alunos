import { Usuario } from './../../../models/usuario';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  usuarios: Usuario[] = [];
  limite: number[] = [10, 20, 30];
  limiteSelecionado = 10;
  paginaAtual = 1;
  ultimaPagina = 0;
  campoDeOrdenacao = 'nome';
  srcSetaOrdenacao = '';

  setasOrdenacao = {
    id: '',
    nome: 'assets/expand-arrow.png',
    email: ''
  };

  ordem = {
    id: 'asc',
    nome: 'asc',
    email: 'asc'
  };

  constructor(private service: UsuariosService) { }

  ngOnInit(): void {
    this.listarPrimeiraPagina();
  }

  listarPrimeiraPagina() {
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
      this.usuarios = listaEstudantes.data;
      this.ultimaPagina = listaEstudantes.last;
    })
  }

  listarProximaPagina() {
    if (this.paginaAtual < this.ultimaPagina) {
      this.paginaAtual++;
      this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
        this.usuarios = listaEstudantes.data;
      });
    }
  }

  listarPaginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
        this.usuarios = listaEstudantes.data;
      })
    }
  }

  listarUltimaPagina() {
    this.paginaAtual = this.ultimaPagina;
    this.service.listar(this.paginaAtual, this.limiteSelecionado, this.campoDeOrdenacao).subscribe((listaEstudantes) => {
      this.usuarios = listaEstudantes.data;
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

    this.listarPrimeiraPagina();
  }

}
