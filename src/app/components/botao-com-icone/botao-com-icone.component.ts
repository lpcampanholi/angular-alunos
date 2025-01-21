import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-com-icone',
  imports: [],
  templateUrl: './botao-com-icone.component.html',
  styleUrl: './botao-com-icone.component.css'
})
export class BotaoComIconeComponent {

  @Input() caminhoIcone: string = '';
  @Input() altIcone: string = 'Ícone';
  @Input() corFundo: string = '--cor-destaque';
  @Input() corHover: string = '--cor-destaque-hover';

}
