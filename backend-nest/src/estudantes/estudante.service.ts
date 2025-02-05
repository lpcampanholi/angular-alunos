import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudanteEntity } from './estudante.entity';
import { Repository } from 'typeorm';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante.dto';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';
import { EstudantePaginadoDTO } from './dto/estudante-paginado.dto';

@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(EstudanteEntity)
    private readonly repository: Repository<EstudanteEntity>,
  ) {}

  async buscarUm(id: number): Promise<EstudanteEntity> {
    const estudante = await this.repository.findOne({
      where: { id },
    });
    if (estudante) {
      return estudante;
    } else {
      throw new NotFoundException('Estudante não encontrado');
    }
  }

  async listar(
    pagina: number,
    limite: number,
    ordenarPor: string,
  ): Promise<EstudantePaginadoDTO> {
    const [dados, total] = await this.repository.findAndCount({
      skip: (pagina - 1) * limite,
      take: limite,
      order: {
        [ordenarPor.replace('-', '')]: ordenarPor.startsWith('-')
          ? 'DESC'
          : 'ASC',
      },
    });
    const ultimaPagina = Math.ceil(total / limite);
    return {
      first: 1,
      prev: pagina > 1 ? pagina - 1 : null,
      next: pagina < ultimaPagina ? pagina + 1 : null,
      last: ultimaPagina,
      pages: ultimaPagina,
      items: total,
      data: dados,
    };
  }

  async criar(novoEstudante: CriarEstudanteDTO) {
    await this.repository.save(novoEstudante);
  }

  async atualizar(id: number, estudante: AtualizarEstudanteDTO) {
    await this.repository.update(id, estudante);
  }

  async excluir(id: number) {
    await this.repository.delete(id);
  }
}
