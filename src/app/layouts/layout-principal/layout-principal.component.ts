import { Component } from '@angular/core';
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from "../../components/menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-layout-principal',
  imports: [RouterOutlet, RodapeComponent, MenuLateralComponent],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css'
})
export class LayoutPrincipalComponent {

}
