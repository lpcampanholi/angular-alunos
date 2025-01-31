import { IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizarEstudanteDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nomeCompleto: string;

  @IsNotEmpty({ message: 'O endereco não pode ser vazio' })
  @IsOptional()
  endereco: string;

  @IsNotEmpty({ message: 'O bairro não pode ser vazio' })
  @IsOptional()
  bairro: string;

  @IsNotEmpty({ message: 'O responsavel não pode ser vazio' })
  @IsOptional()
  responsavel: string;

  @IsNotEmpty({
    message: 'O id do parentesco do responsável não pode ser vazio',
  })
  @IsOptional()
  parentescoId: number;

  @IsOptional()
  @IsNotEmpty({ message: 'O whatsapp não pode ser vazio' })
  whatsapp: string;
}
