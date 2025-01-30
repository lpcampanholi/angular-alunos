import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validators/email-eh-unico.validator';

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailIsUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
