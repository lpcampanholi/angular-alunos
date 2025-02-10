import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotaoComponent } from '../../components/botao/botao.component';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutAutenticacaoComponent } from "../../layouts/layout-autenticacao/layout-autenticacao.component";
import { MensagemValidacaoComponent } from "../../components/mensagem-validacao/mensagem-validacao.component";
import { CredenciaisLogin } from '../../../types/login-credenciais.type';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    BotaoComponent,
    LayoutAutenticacaoComponent,
    RouterModule,
    MensagemValidacaoComponent
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
    private autenticacaoService: AutenticacaoService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
  }

  submeterForm() {
    const credenciais: CredenciaisLogin = {
      email: this.formulario.value.email,
      senha: this.formulario.value.senha,
    }
    this.autenticacaoService.login(credenciais).subscribe(
      {
        next: () => {
          this.toastService.success("Seja bem-vindo!");
          this.router.navigate(['/estudantes']);
        },
        error: (err) => {
          if (Array.isArray(err.error?.message)) {
            err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
          } else {
            const mensagemErro = err.error?.message || 'Credenciais inválidas';
            this.toastService.error(mensagemErro);
          }
        },
      });
  }

}
