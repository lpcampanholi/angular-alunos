import { UsuarioEntity } from '../usuario.entity';

export class UsuarioPaginadoDTO {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: UsuarioEntity[];
}
