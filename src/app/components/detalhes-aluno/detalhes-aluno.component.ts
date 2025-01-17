import { Component, Input } from '@angular/core';
import { Aluno } from '../../../types/aluno';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-aluno',
  imports: [FormsModule],
  templateUrl: './detalhes-aluno.component.html',
  styleUrl: './detalhes-aluno.component.css'
})
export class DetalhesAlunoComponent {

  @Input() aluno: Aluno =     {
    id: 0,
    nomeCompleto: "",
    endereco: "",
    bairro: "",
    responsavelNome: "",
    parentecoResponsavel: "",
    whatsappResponsavel: ""
  }

  ngOnInit() {}



}
