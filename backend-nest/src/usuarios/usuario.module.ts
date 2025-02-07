import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { EmailIsUniqueValidator } from './validators/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailIsUniqueValidator],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
