import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoComponent } from "../botao/botao.component";
import { DialogModalComponent } from "../dialog-modal/dialog-modal.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../types/parentesco';

@Component({
  selector: 'app-modal-cadastro-parentesco',
  imports: [ReactiveFormsModule, BotaoComponent, DialogModalComponent],
  templateUrl: './modal-cadastro-parentesco.component.html',
  styleUrl: './modal-cadastro-parentesco.component.css'
})
export class ModalCadastroParentescoComponent {

  @Output() aoModalCadastroFechado = new EventEmitter<void>();
  @Output() aoModalCadastroSubmetido = new EventEmitter<void>();

  formulario = new FormGroup({
    nome: new FormControl<string>('', Validators.required)
  })

  constructor(private parentescosService: ParentescosService) { }

  submeterForm() {
    if (this.formulario.valid) {
      this.criarParentesco();
    }
  }

  criarParentesco() {
    const novoParentesco = this.formulario.value as Parentesco;
    this.parentescosService.criarParentesco(novoParentesco).subscribe(() => {
      this.aoFecharModal();
      this.aoModalCadastroSubmetido.emit();
    });
  }

  aoFecharModal() {
    this.aoModalCadastroFechado.emit();
  }

}
