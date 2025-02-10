import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { LoginResponse } from './models/token';
import { ListarUsuarioDTO } from 'src/usuarios/dto/listar-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(usuario: {
    email: string;
    senha: string;
  }): Promise<LoginResponse> {
    const usuarioEncontrado = await this.usuarioService.encontrarPorEmail(
      usuario.email,
    );
    if (usuarioEncontrado?.senha !== usuario.senha) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: usuarioEncontrado?.id,
      email: usuarioEncontrado?.email,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      nome: usuarioEncontrado.nome,
    };
  }

  async verificaSessao(usuarioToken: {
    sub: number;
    email: string;
  }): Promise<ListarUsuarioDTO> {
    const usuario = await this.usuarioService.encontrarPorId(usuarioToken.sub);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  }
}
