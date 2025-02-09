import { Component } from '@angular/core';
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { MenuLateralComponent } from "../../components/menu-lateral/menu-lateral.component";
import { BarraSuperiorComponent } from "../../components/barra-superior/barra-superior.component";

@Component({
  selector: 'app-layout-principal',
  imports: [RodapeComponent, MenuLateralComponent, BarraSuperiorComponent],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css'
})
export class LayoutPrincipalComponent {

}
