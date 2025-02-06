import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotaoComponent } from '../../shared/botao/botao.component';

@Component({
  selector: 'app-formulario-login',
  imports: [
    ReactiveFormsModule,
    BotaoComponent,
  ],
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent {

  formulario = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
  });

  constructor(
  ) { }

  ngOnInit() {
  }

  submeterForm() {
  }

}
