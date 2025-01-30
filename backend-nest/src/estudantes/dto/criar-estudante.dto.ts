import { IsNotEmpty } from 'class-validator';

export class CriarEstudanteDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nomeCompleto: string;

  @IsNotEmpty({ message: 'O endereco não pode ser vazio' })
  endereco: string;

  @IsNotEmpty({ message: 'O bairro não pode ser vazio' })
  bairro: string;

  @IsNotEmpty({ message: 'O responsavel não pode ser vazio' })
  responsavel: string;

  @IsNotEmpty({
    message: 'Indique o id do parentesco do responsável não pode ser vazio',
  })
  parentescoId: string;

  @IsNotEmpty({ message: 'O whatsapp não pode ser vazio' })
  whatsapp: string;
}
