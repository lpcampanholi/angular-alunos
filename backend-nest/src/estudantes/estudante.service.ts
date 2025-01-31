import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudanteEntity } from './estudante.entity';
import { Repository } from 'typeorm';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante-dto';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';

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

  async listar(): Promise<EstudanteEntity[]> {
    const listaEstudantes = await this.repository.find();
    return listaEstudantes;
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
