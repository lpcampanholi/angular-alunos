import { IsNotEmpty } from 'class-validator';

export class AtualizarParentescoDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;
}
