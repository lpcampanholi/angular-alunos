import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() parentesco: Parentesco | null = null;
  @Output() aoModalCadastroFechado = new EventEmitter<void>();

  formulario = new FormGroup({
    nome: new FormControl<string>('', Validators.required)
  })

  constructor(private parentescosService: ParentescosService) { }

  ngOnInit() {
    this.formulario.patchValue(this.parentesco);
  }

  submeterForm() {
    if (this.formulario.valid) {
      if (this.parentesco) {
        this.atualizarParentesco();
      } else {
        this.criarParentesco();
      }
    }
  }

  criarParentesco() {
    const novoParentesco = this.formulario.value as Parentesco;
    this.parentescosService.criar(novoParentesco).subscribe(() => {
      this.aoFecharModal();
    });
  }

  atualizarParentesco() {
    const parentescoAtualizado = {
      id: this.parentesco.id!,
      ...this.formulario.value
    } as Parentesco;
    this.parentescosService.atualizar(parentescoAtualizado).subscribe(() => {
      this.aoFecharModal();
    });
  }

  excluirParentesco() {
    if (this.parentesco) {
      this.parentescosService.excluir(this.parentesco.id).subscribe(() => {
        this.aoFecharModal();
      });
    }
  }

  aoFecharModal() {
    this.aoModalCadastroFechado.emit();
  }

}
