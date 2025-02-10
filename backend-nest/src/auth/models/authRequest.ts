import { Request } from 'express';
import { UsuarioEntity } from 'src/usuarios/usuario.entity'; // Substitua pelo seu modelo de usuário

export interface AuthRequest extends Request {
  usuario: UsuarioEntity;
}
