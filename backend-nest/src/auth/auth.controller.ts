import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from './decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { AuthRequest } from './models/authRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() usuario: { email: string; senha: string }) {
    return this.authService.login(usuario);
  }

  @Get('me')
  async verificarSessao(@Req() request: AuthRequest) {
    return await this.authService.verificaSessao(request.usuario);
  }
}
