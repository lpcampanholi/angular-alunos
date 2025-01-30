export class ListarEstudanteDTO {
  constructor(
    readonly nomeCompleto: string,
    readonly endereco: string,
    readonly bairro: string,
    readonly responsavel: string,
    readonly parentescoId: string,
    readonly whatsapp: string,
  ) {}
}
