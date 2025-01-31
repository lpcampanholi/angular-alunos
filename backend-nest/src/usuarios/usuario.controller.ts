import { UsuarioService } from './usuario.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { ListarUsuarioDTO } from './dto/listar-usuario-dto';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario-dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private service: UsuarioService) {}

  @Get('/:id')
  async findUserById(@Param('id') id: number): Promise<ListarUsuarioDTO> {
    const usuario = await this.service.buscarUm(id);
    if (usuario) {
      return usuario;
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  @Get()
  async findAllUsers(): Promise<ListarUsuarioDTO[]> {
    const usuarios = await this.service.listar();
    return usuarios;
  }

  @Post()
  async createUser(@Body() user: CriarUsuarioDTO) {
    await this.service.criar(user);
    return 'Usuário criado com sucesso';
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() newData: AtualizarUsuarioDTO,
  ) {
    await this.service.atualizar(id, newData);
    return 'Usuário atualizado com sucesso';
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.service.excluir(id);
    return 'Usuário excluído com sucesso';
  }
}
