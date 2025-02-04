import { Parentesco } from "./parentesco"

export type Estudante = {
  id?: number,
  nomeCompleto: string,
  endereco: string,
  bairro: string,
  responsavel: string,
  parentesco: Parentesco,
  whatsapp: string
}
