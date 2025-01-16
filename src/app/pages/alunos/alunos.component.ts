import { Component } from '@angular/core';
import { ListaAlunosComponent } from "../../components/lista-alunos/lista-alunos.component";

@Component({
  selector: 'app-alunos',
  imports: [ListaAlunosComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

}
