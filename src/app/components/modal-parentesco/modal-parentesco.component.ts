import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoComponent } from "../botao/botao.component";
import { DialogModalComponent } from "../dialog-modal/dialog-modal.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParentescosService } from '../../services/parentescos.service';
import { Parentesco } from '../../../types/parentesco.type';
import { AlertDialogExcluirComponent } from "../alert-dialog-excluir/alert-dialog-excluir.component";
import { MensagemValidacaoComponent } from "../mensagem-validacao/mensagem-validacao.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-parentesco',
  standalone: true,
  imports: [ReactiveFormsModule, BotaoComponent, DialogModalComponent, AlertDialogExcluirComponent, MensagemValidacaoComponent],
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

  constructor(
    private parentescosService: ParentescosService,
    private toastService: ToastrService,
  ) { }

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
    this.parentescosService.criar(novoParentesco).subscribe({
      next: () => {
        this.toastService.success('Parentesco criado');
        this.aoFecharModal();
      },
      error: (err) => {
        if (Array.isArray(err.error?.message)) {
          err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
        } else {
          const mensagemErro = err.error?.message || 'Erro ao criar parentesco';
          this.toastService.error(mensagemErro);
        }
      },
    });
  }

  atualizarParentesco() {
    const parentescoAtualizado: Parentesco = {
      nome: this.formulario.get('nome')?.value,
    };
    this.parentescosService.atualizar(this.parentesco.id, parentescoAtualizado).subscribe({
      next: () => {
        this.toastService.success('Parentesco atualizado');
        this.aoFecharModal();
      },
      error: (err) => {
        if (Array.isArray(err.error?.message)) {
          err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
        } else {
          const mensagemErro = err.error?.message || 'Erro ao atualizar parentesco';
          this.toastService.error(mensagemErro);
        }
      },
    });
  }

  excluirParentesco() {
    if (this.parentesco) {
      this.parentescosService.excluir(this.parentesco.id).subscribe({
        next: () => {
          this.toastService.success('Paresntesco Excluído');
          this.aoFecharModal();
        },
        error: (err) => {
          if (Array.isArray(err.error?.message)) {
            err.error.message.forEach((mensagem: string) => this.toastService.error(mensagem));
          } else {
            const mensagemErro = err.error?.message || 'Erro ao excluir parentesco';
            this.toastService.error(mensagemErro);
          }
        },
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
