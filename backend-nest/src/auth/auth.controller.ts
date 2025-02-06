import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/is-public.decorator';
import { UsuarioLoginDTO } from 'src/usuarios/dto/usuario-login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() usuario: UsuarioLoginDTO) {
    return this.authService.login(usuario);
  }
}
