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

@Controller('students')
export class EstudanteController {
  constructor(private estudanteService: EstudanteService) {}

  @Get('/:id')
  async findStudentById(@Param('id') id: string): Promise<ListarEstudanteDTO> {
    const estudante = await this.estudanteService.buscarUm(id);
    if (estudante) {
      return estudante;
    } else {
      throw new NotFoundException('Estudante não encontrado');
    }
  }

  @Get()
  async buscarTodosEstudantes(): Promise<ListarEstudanteDTO[]> {
    const estudantes = await this.estudanteService.listar();
    return estudantes;
  }

  @Post()
  async criarEstudante(@Body() student: CriarEstudanteDTO) {
    const estudanteCriado = await this.estudanteService.criar(student);
    return {
      student: estudanteCriado,
      message: 'Student created successfully',
    };
  }

  @Put('/:id')
  async atualizarEstudante(
    @Param('id') id: string,
    @Body() newData: AtualizarEstudanteDTO,
  ) {
    const estudanteAtualizado = await this.estudanteService.atualizar(
      id,
      newData,
    );
    return {
      student: estudanteAtualizado,
      message: 'Student updated successfully',
    };
  }

  @Delete('/:id')
  async excluirEstudante(@Param('id') id: string) {
    const estudanteExcluido = await this.estudanteService.excluir(id);
    return {
      student: estudanteExcluido,
      message: 'Student deleted successfully',
    };
  }
}
