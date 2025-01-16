import { Component, signal } from '@angular/core';

interface Aluno {
  id: number,
  nome: string
}

@Component({
  selector: 'app-lista-alunos',
  imports: [],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css'
})
export class ListaAlunosComponent {

  alunos: Aluno[] = [
    {id: 0, nome: "José Cézar"},
    {id: 1, nome: "Daniel"},
    {id: 2, nome: "Júnior"},
    {id: 3, nome: "Maria"},
    {id: 4, nome: "Juliano"},
    {id: 5, nome: "Jonivaldo"},
    {id: 6, nome: "André"},
    {id: 7, nome: "Juliano"},
    {id: 8, nome: "Jonivaldo"},
    {id: 9, nome: "André"}
  ]

}
