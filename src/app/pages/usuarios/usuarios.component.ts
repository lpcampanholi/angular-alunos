import { Component } from '@angular/core';
import { TituloPrincipalComponent } from "../../components/titulo-principal/titulo-principal.component";
import { ListaUsuariosComponent } from "../../components/lista-usuarios/lista-usuarios.component";
import { LayoutPrincipalComponent } from "../../layouts/layout-principal/layout-principal.component";

@Component({
  selector: 'app-usuarios',
  imports: [TituloPrincipalComponent, ListaUsuariosComponent, LayoutPrincipalComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
