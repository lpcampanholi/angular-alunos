import { Module } from '@nestjs/common';
import { ParentescoController } from './parentesco.controller';
import { ParentescoService } from './parentesco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentescoEntity } from './parentesco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentescoEntity])],
  controllers: [ParentescoController],
  providers: [ParentescoService],
})
export class ParentescoModule {}
