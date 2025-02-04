import { Component } from '@angular/core';
import { TituloPrincipalComponent } from "../../shared/titulo-principal/titulo-principal.component";
import { ListaUsuariosComponent } from "../../components/lista-usuarios/lista-usuarios.component";

@Component({
  selector: 'app-usuarios',
  imports: [TituloPrincipalComponent, ListaUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
