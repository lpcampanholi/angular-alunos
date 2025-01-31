import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarUsuarioDTO } from './dto/listar-usuario-dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario-dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
  ) {}

  async buscarUm(id: number): Promise<ListarUsuarioDTO> {
    const usuario = await this.repository.findOneBy({ id });
    if (usuario) {
      return new ListarUsuarioDTO(usuario.id, usuario.nome);
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async existeComEmail(email: string): Promise<boolean> {
    const usuario = await this.repository.findOneBy({ email });
    return !!usuario;
  }

  async listar(): Promise<ListarUsuarioDTO[]> {
    const usuariosSalvos = await this.repository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListarUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async criar(novoUsuario: CriarUsuarioDTO) {
    const usuarioEntity: UsuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = novoUsuario.nome;
    usuarioEntity.email = novoUsuario.email;
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
