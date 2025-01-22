import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao',
  imports: [CommonModule],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css'
})
export class BotaoComponent {

  @Input() tipo: 'destaque' | 'excluir' | 'outline' = 'destaque';
  @Input() disabled = false;

  get classeBotao(): string {
    return `botao-${this.tipo}`;
  }

}
