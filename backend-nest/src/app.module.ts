import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuarios/usuario.module';
import { EstudanteModule } from './estudantes/estudante.module';
import { ParentescoModule } from './parentescos/parentesco.module';

@Module({
  imports: [
    UsuarioModule,
    EstudanteModule,
    ParentescoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
