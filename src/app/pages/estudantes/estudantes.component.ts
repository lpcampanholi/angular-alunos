import { Component } from '@angular/core';
import { ListaEstudantesComponent } from "../../components/lista-estudantes/lista-estudantes.component";
import { TituloPrincipalComponent } from "../../components/titulo-principal/titulo-principal.component";
import { LayoutPrincipalComponent } from "../../layouts/layout-principal/layout-principal.component";
import { BotaoAdicionarComponent } from "../../components/botao-adicionar/botao-adicionar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estudantes',
  imports: [
    ListaEstudantesComponent,
    TituloPrincipalComponent,
    LayoutPrincipalComponent,
    BotaoAdicionarComponent,
    RouterModule,
  ],
  templateUrl: './estudantes.component.html',
  styleUrl: './estudantes.component.css'
})
export class EstudantesComponent {

}
