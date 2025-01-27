import { Component } from '@angular/core';
import { TituloPrincipalComponent } from "../../shared/titulo-principal/titulo-principal.component";

@Component({
  selector: 'app-home',
  imports: [TituloPrincipalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
