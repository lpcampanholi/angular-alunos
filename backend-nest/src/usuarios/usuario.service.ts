import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { UsuarioPaginadoDTO } from './dto/usuario-paginado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
  ) {}

  async buscarUm(id: number): Promise<ListarUsuarioDTO> {
    const usuario = await this.repository.findOneBy({ id });
    if (usuario) {
      return new ListarUsuarioDTO(
        usuario.id,
        usuario.nome,
        usuario.email,
        usuario.senha,
      );
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async existeComEmail(email: string): Promise<boolean> {
    const usuario = await this.repository.findOneBy({ email });
    return !!usuario;
  }

  async encontrarPorEmail(email: string): Promise<UsuarioEntity | null> {
    const usuario = await this.repository.findOneBy({ email });
    return usuario;
  }

  async encontrarPorId(id: number): Promise<UsuarioEntity | null> {
    const usuario = await this.repository.findOneBy({ id });
    return usuario;
  }

  async listar(
    pagina: number,
    limite: number,
    ordenarPor: string,
  ): Promise<UsuarioPaginadoDTO> {
    const [dados, total] = await this.repository.findAndCount({
      skip: (pagina - 1) * limite,
      take: limite,
      order: {
        [ordenarPor.replace('-', '')]: ordenarPor.startsWith('-')
          ? 'DESC'
          : 'ASC',
      },
    });
    const ultimaPagina = Math.ceil(total / limite);
    return {
      first: 1,
      prev: pagina > 1 ? pagina - 1 : null,
      next: pagina < ultimaPagina ? pagina + 1 : null,
      last: ultimaPagina,
      pages: ultimaPagina,
      items: total,
      data: dados,
    };
  }

  async criar(novoUsuario: CriarUsuarioDTO) {
    const usuarioEntity: UsuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = novoUsuario.nome;
    usuarioEntity.email = novoUsuario.email;
    // usuarioEntity.senha = await bcrypt.hash(novoUsuario.senha, 10);
    usuarioEntity.senha = novoUsuario.senha;
    await this.repository.save(usuarioEntity);
  }

  async atualizar(id: number, usuario: AtualizarUsuarioDTO) {
    await this.repository.update(id, usuario);
  }

  async excluir(id: number) {
    await this.repository.delete(id);
  }
}
