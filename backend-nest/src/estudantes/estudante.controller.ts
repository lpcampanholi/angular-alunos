import { EstudanteService } from './estudante.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante-dto';
import { EstudanteEntity } from './estudante.entity';

@Controller('estudantes')
export class EstudanteController {
  constructor(private service: EstudanteService) {}

  @Get('/:id')
  async buscarEstudantePorID(
    @Param('id') id: number,
  ): Promise<EstudanteEntity> {
    const estudante = await this.service.buscarUm(id);
    return estudante;
  }

  @Get()
  async buscarTodosEstudantes(): Promise<EstudanteEntity[]> {
    const estudantes = await this.service.listar();
    return estudantes;
  }

  @Post()
  async criarEstudante(@Body() student: CriarEstudanteDTO) {
    await this.service.criar(student);
    return 'Estudante criado com sucesso';
  }

  @Put('/:id')
  async atualizarEstudante(
    @Param('id') id: number,
    @Body() newData: AtualizarEstudanteDTO,
  ) {
    await this.service.atualizar(id, newData);
    return 'Estudante atualizado com sucesso';
  }

  @Delete('/:id')
  async excluirEstudante(@Param('id') id: number) {
    await this.service.excluir(id);
    return 'Estudante excluído com sucesso';
  }
}
