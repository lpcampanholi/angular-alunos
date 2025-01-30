import { Estudante } from "./estudante"

export type EstudantePaginado = {
  first: number,
  prev: number,
  next: number,
  last: number,
  pages: number,
  items: number,
  data: Estudante[],
}
