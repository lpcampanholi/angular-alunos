import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoComponent } from "../../shared/botao/botao.component";
import { DialogModalComponent } from "../../shared/dialog-modal/dialog-modal.component";

@Component({
  selector: 'app-alert-dialog-excluir',
  imports: [BotaoComponent, DialogModalComponent],
  templateUrl: './alert-dialog-excluir.component.html',
  styleUrl: './alert-dialog-excluir.component.css'
})
export class AlertDialogExcluirComponent {

  @Output() aoModalFechado = new EventEmitter<void>();
  @Output() aoConfirmarExclusao = new EventEmitter<void>();

  fecharModal() {
    this.aoModalFechado.emit();
  }

  confirmarExclusao(event: Event) {
    event.preventDefault();
    this.aoConfirmarExclusao.emit();
  }

}
