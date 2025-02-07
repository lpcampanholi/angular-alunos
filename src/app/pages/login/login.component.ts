import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotaoComponent } from '../../shared/botao/botao.component';
import { loginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutAutenticacaoComponent } from "../../layouts/layout-autenticacao/layout-autenticacao.component";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    BotaoComponent,
    LayoutAutenticacaoComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    senha: new FormControl<string>('', Validators.required),
  });

  constructor(
    private router: Router,
    private loginService: loginService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
  }

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
