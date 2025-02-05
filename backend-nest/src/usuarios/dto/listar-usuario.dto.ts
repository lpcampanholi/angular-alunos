export class ListarUsuarioDTO {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly email: string,
    readonly senha: string,
  ) {}
}
