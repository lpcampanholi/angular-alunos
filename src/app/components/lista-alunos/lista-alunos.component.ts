import { Aluno } from '../../../types/aluno';
import { AlunosService } from '../../services/aluno.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-alunos',
  imports: [FormsModule],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {

  alunos: Aluno[] = [];
  itensPorPagina: number[] = [10, 20, 30];
  itensPorPaginaSelecionado = 10;
  pagina = 1;

  constructor(private service: AlunosService) { }

  ngOnInit(): void {
    this.listarAlunos();
  }

  listarAlunos() {
    this.pagina = 1;
    this.service.listar(this.pagina, this.itensPorPaginaSelecionado).subscribe((listaAlunos) => {
      this.alunos = listaAlunos;
    })
  }

  listarAlunosProximaPagina() {

  }

}
