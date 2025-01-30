import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarUsuarioDTO } from './dto/listar-usuario-dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario-dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async buscarUm(id: string): Promise<UsuarioEntity | null> {
    return await this.usuarioRepository.findOneBy({ id });
  }

  async existeComEmail(email: string): Promise<boolean> {
    const user = await this.usuarioRepository.findOneBy({ email });
    return user !== undefined;
  }

  async listar() {
    const savedUsers = await this.usuarioRepository.find();
    const usersList = savedUsers.map(
      (usuario) => new ListarUsuarioDTO(usuario.id, usuario.nome),
    );
    return usersList;
  }

  async criar(novoUsuario: CriarUsuarioDTO): Promise<ListarUsuarioDTO> {
    const userEntity: UsuarioEntity = new UsuarioEntity();
    userEntity.id = uuid();
    userEntity.nome = novoUsuario.nome;
    userEntity.email = novoUsuario.email;
    userEntity.senha = novoUsuario.senha;
    await this.usuarioRepository.save(userEntity);
    return new ListarUsuarioDTO(userEntity.id, userEntity.nome);
  }

  async atualizar(id: string, user: AtualizarUsuarioDTO): Promise<void> {
    await this.usuarioRepository.update(id, user);
  }

  async excluir(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
