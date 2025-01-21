import { Component } from '@angular/core';
import { ListaAlunosComponent } from "../../components/lista-alunos/lista-alunos.component";
import { TituloPrincipalComponent } from "../../components/titulo-principal/titulo-principal.component";

@Component({
  selector: 'app-alunos',
  imports: [ListaAlunosComponent, TituloPrincipalComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

}
