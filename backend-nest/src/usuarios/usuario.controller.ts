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
  constructor(private userService: UsuarioService) {}

  @Get('/:id')
  async findUserById(@Param('id') id: string): Promise<ListarUsuarioDTO> {
    const usuario = await this.userService.buscarUm(id);
    if (usuario) {
      return usuario;
    } else {
      throw new NotFoundException('User não encontrado');
    }
  }

  @Get()
  async findAllUsers(): Promise<ListarUsuarioDTO[]> {
    const usuarios = await this.userService.listar();
    return usuarios;
  }

  @Post()
  async createUser(@Body() user: CriarUsuarioDTO) {
    const createdUser = await this.userService.criar(user);
    return {
      user: createdUser,
      message: 'User created successfully',
    };
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() newData: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.userService.atualizar(id, newData);
    return {
      user: usuarioAtualizado,
      message: 'User updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.excluir(id);
    return {
      user: deletedUser,
      message: 'User deleted successfully',
    };
  }
}
