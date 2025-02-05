import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoComponent } from "../../shared/botao/botao.component";
import { DialogModalComponent } from "../../shared/dialog-modal/dialog-modal.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../models/parentesco';
import { AlertDialogExcluirComponent } from "../alert-dialog-excluir-estudante/alert-dialog-excluir.component";

@Component({
  selector: 'app-modal-parentesco',
  standalone: true,
  imports: [ReactiveFormsModule, BotaoComponent, DialogModalComponent, AlertDialogExcluirComponent],
  templateUrl: './modal-parentesco.component.html',
  styleUrl: './modal-parentesco.component.css'
})
export class ModalParentescoComponent {

  @Input() parentesco: Parentesco | null = null;
  @Output() aoModalCadastroFechado = new EventEmitter<void>();
  modalExcluirAberto: boolean = false;

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
    const parentescoAtualizado: Parentesco = {
      nome: this.formulario.get('nome')?.value,
    };
    this.parentescosService.atualizar(this.parentesco.id, parentescoAtualizado).subscribe(() => {
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

  abrirModalExcluir() {
    this.modalExcluirAberto = true;
  }

  fecharModalExcluir() {
    this.modalExcluirAberto = false;
  }

  confirmarExclusao() {
    this.excluirParentesco();
    this.modalExcluirAberto = false;
  }

}
