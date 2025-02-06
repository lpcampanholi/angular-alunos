import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { UsuarioService } from 'src/usuarios/usuario.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService],
})
export class AuthModule {}
