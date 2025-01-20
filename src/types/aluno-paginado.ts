import { Aluno } from "./aluno"

export type AlunoPaginado = {
  first: number,
  prev: number,
  next: number,
  last: number,
  pages: number,
  items: number,
  data: Aluno[],
}
