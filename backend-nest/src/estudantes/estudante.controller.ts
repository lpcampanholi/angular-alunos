import { EstudanteService } from './estudante.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante.dto';
import { EstudanteEntity } from './estudante.entity';
import { EstudantePaginadoDTO } from './dto/estudante-paginado.dto';

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
  async buscarTodosEstudantes(
    @Query('pagina') pagina = 1,
    @Query('limite') limite = 10,
    @Query('ordenarPor') ordenarPor = 'nomeCompleto',
  ): Promise<EstudantePaginadoDTO> {
    const estudantes = await this.service.listar(pagina, limite, ordenarPor);
    return estudantes;
  }

  @Post()
  async criarEstudante(@Body() novoEstudante: CriarEstudanteDTO) {
    await this.service.criar(novoEstudante);
    return { message: 'Estudante criado com sucesso' };
  }

  @Put('/:id')
  async atualizarEstudante(
    @Param('id') id: number,
    @Body() estudanteAtualizado: AtualizarEstudanteDTO,
  ) {
    await this.service.atualizar(id, estudanteAtualizado);
    return { message: 'Estudante atualizado com sucesso' };
  }

  @Delete('/:id')
  async excluirEstudante(@Param('id') id: number) {
    await this.service.excluir(id);
    return { message: 'Estudante excluído com sucesso' };
  }
}
