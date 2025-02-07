import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotaoComponent } from '../../shared/botao/botao.component';
import { loginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LayoutAutenticacaoComponent } from "../../layouts/layout-autenticacao/layout-autenticacao.component";

@Component({
  selector: 'app-formulario-cadastre-se',
  imports: [
    ReactiveFormsModule,
    BotaoComponent,
    LayoutAutenticacaoComponent
],
  templateUrl: './cadastre-se.component.html',
  styleUrls: ['./cadastre-se.component.css']
})
export class CadastreSeComponent {

  formulario = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
  });

  constructor(
    private router: Router,
    private loginService: loginService,
    private toastService: ToastrService,
  ) { }

  submeterForm() {
    this.loginService.login(this.formulario.value.email, this.formulario.value.senha).subscribe(
      {
        next: () => {
          this.toastService.success("Login feito com sucesso!");
          this.router.navigate(['/estudantes']);
        },
        error: () => this.toastService.error("Credenciais inválidas!"),
      });
  }

}
