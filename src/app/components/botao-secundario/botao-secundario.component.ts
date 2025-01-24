import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-secundario',
  imports: [CommonModule],
  templateUrl: './botao-secundario.component.html',
  styleUrl: './botao-secundario.component.css'
})
export class BotaoSecundarioComponent {

  @Input() disabled = false;
  @Input() type: string = 'button';

}
