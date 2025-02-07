import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './decorators/is-public.decorator';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() usuario: { email: string; senha: string }) {
    return this.authService.login(usuario);
  }
}
