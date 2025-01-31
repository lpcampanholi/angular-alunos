import { EstudanteService } from './estudante.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';
import { ListarEstudanteDTO } from './dto/listar-estudante-dto';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante-dto';

@Controller('estudantes')
export class EstudanteController {
  constructor(private service: EstudanteService) {}

  @Get('/:id')
  async buscarEstudantePorID(
    @Param('id') id: number,
  ): Promise<ListarEstudanteDTO> {
    const estudante = await this.service.buscarUm(id);
    if (estudante) {
      return estudante;
    } else {
      throw new NotFoundException('Estudante não encontrado');
    }
  }

  @Get()
  async buscarTodosEstudantes(): Promise<ListarEstudanteDTO[]> {
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
