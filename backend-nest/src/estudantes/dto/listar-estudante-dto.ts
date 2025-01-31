export class ListarEstudanteDTO {
  constructor(
    readonly id: number,
    readonly nomeCompleto: string,
    readonly endereco: string,
    readonly bairro: string,
    readonly responsavel: string,
    readonly parentescoId: number,
    readonly whatsapp: string,
  ) {}
}
