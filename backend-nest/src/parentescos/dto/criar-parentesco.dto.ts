import { IsNotEmpty } from 'class-validator';

export class CriarParentescoDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;
}
