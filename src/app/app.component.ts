import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { RodapeComponent } from "./components/rodape/rodape.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuLateralComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-alunos';
}
