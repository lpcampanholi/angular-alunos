import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoComponent } from "../botao/botao.component";

@Component({
  selector: 'app-alert-dialog-excluir',
  imports: [BotaoComponent],
  templateUrl: './alert-dialog-excluir.component.html',
  styleUrl: './alert-dialog-excluir.component.css'
})
export class AlertDialogExcluirComponent {

  @Output() fechar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
  }

  confirmarExclusao(event: Event) {
    event.preventDefault();
    this.confirmar.emit();
  }

  aoClicarNoModal(event: Event) {
    event.stopPropagation();
  }

}
