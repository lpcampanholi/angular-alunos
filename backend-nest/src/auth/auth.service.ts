import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { UsuarioLoginDTO } from 'src/usuarios/dto/usuario-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(usuario: UsuarioLoginDTO): Promise<{ access_token: string }> {
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
