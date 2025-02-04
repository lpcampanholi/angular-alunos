import { EstudanteEntity } from '../estudante.entity';

export class EstudantePaginadoDTO {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: EstudanteEntity[];
}
