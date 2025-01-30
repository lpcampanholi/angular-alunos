import { Module } from '@nestjs/common';
import { EstudanteController } from './estudante.controller';
import { EstudanteService } from './estudante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudanteEntity } from './estudante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudanteEntity])],
  controllers: [EstudanteController],
  providers: [EstudanteService],
})
export class EstudanteModule {}
