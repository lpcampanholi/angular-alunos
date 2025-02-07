import { UsuarioService } from './usuario.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { UsuarioPaginadoDTO } from './dto/usuario-paginado.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private service: UsuarioService) {}

  @Get('/:id')
  async EncontrarUsuarioPeloId(
    @Param('id') id: number,
  ): Promise<ListarUsuarioDTO> {
    const usuario = await this.service.buscarUm(id);
    return usuario;
  }

  @Get()
  async buscarTodosUsuarios(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10,
    @Query('ordenarPor') ordenarPor = 'nome',
  ): Promise<UsuarioPaginadoDTO> {
    const estudantes = await this.service.listar(pagina, limite, ordenarPor);
    return estudantes;
  }

  @Post()
  async criarUsuario(@Body() user: CriarUsuarioDTO) {
    await this.service.criar(user);
    return { message: 'Usuário criado com sucesso' };
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: number,
    @Body() newData: AtualizarUsuarioDTO,
  ) {
    await this.service.atualizar(id, newData);
    return { message: 'Usuário atualizado com sucesso' };
  }

  @Delete('/:id')
  async excluirUsuario(@Param('id') id: number) {
    await this.service.excluir(id);
    return { message: 'Usuário excluído com sucesso' };
  }
}
