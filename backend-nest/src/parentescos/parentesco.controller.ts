import { ParentescoService } from './parentesco.service';
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
import { CriarParentescoDTO } from './dto/criar-parentesco.dto';
import { ListarParentescoDTO } from './dto/listar-parentesco-dto';
import { AtualizarParentescoDTO } from './dto/atualizar-parentesco-dto';

@Controller('parentescos')
export class ParentescoController {
  constructor(private service: ParentescoService) {}

  @Get('/:id')
  async buscarParentescoPorId(
    @Param('id') id: number,
  ): Promise<ListarParentescoDTO> {
    const parentesco = await this.service.buscarUm(id);
    if (parentesco) {
      return parentesco;
    } else {
      throw new NotFoundException('Parentesco não encontrado');
    }
  }

  @Get()
  async buscarTodosParentescos(): Promise<ListarParentescoDTO[]> {
    const parentescos = await this.service.listar();
    return parentescos;
  }

  @Post()
  async criarParentesco(@Body() parentesco: CriarParentescoDTO) {
    await this.service.criar(parentesco);
    return 'Parentesco criado com sucesso';
  }

  @Put('/:id')
  async atualizarParentesco(
    @Param('id') id: number,
    @Body() newData: AtualizarParentescoDTO,
  ) {
    await this.service.atualizar(id, newData);
    return 'Parentesco atualizado com sucesso';
  }

  @Delete('/:id')
  async excluirParentesco(@Param('id') id: number) {
    await this.service.excluir(id);
    return 'Parentesco excluído com sucesso';
  }
}
