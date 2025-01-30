import { Component } from '@angular/core';
import { ListaEstudantesComponent } from "../../components/lista-estudantes/lista-estudantes.component";
import { TituloPrincipalComponent } from "../../shared/titulo-principal/titulo-principal.component";

@Component({
  selector: 'app-estudantes',
  imports: [ListaEstudantesComponent, TituloPrincipalComponent],
  templateUrl: './estudantes.component.html',
  styleUrl: './estudantes.component.css'
})
export class EstudantesComponent {

}
