import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-modal',
  imports: [],
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.css'
})
export class DialogModalComponent {

  @Output() aoDialogModalFechado = new EventEmitter<void>();

  aoFecharModal() {
    this.aoDialogModalFechado.emit();
  }

  aoClicarNoModal(event: Event) {
    event.stopPropagation();
  }

}
