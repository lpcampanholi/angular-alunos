import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentescoEntity } from './parentesco.entity';
import { Repository } from 'typeorm';
import { CriarParentescoDTO } from './dto/criar-parentesco.dto';
import { AtualizarParentescoDTO } from './dto/atualizar-parentesco.dto';
import { EstudanteEntity } from 'src/estudantes/estudante.entity';

@Injectable()
export class ParentescoService {
  constructor(
    @InjectRepository(ParentescoEntity)
    private readonly parentescoRepository: Repository<ParentescoEntity>,
    @InjectRepository(EstudanteEntity)
    private readonly estudanteRepository: Repository<EstudanteEntity>,
  ) {}

  async buscarUm(id: number): Promise<ParentescoEntity> {
    const parentesco = await this.parentescoRepository.findOneBy({ id });
    if (parentesco) {
      return parentesco;
    } else {
      throw new NotFoundException('Parentesco não encontrado');
    }
  }

  async listar(): Promise<ParentescoEntity[]> {
    const parentescos = await this.parentescoRepository.find();
    return parentescos;
  }

  async criar(novoParentesco: CriarParentescoDTO) {
    await this.parentescoRepository.save(novoParentesco);
  }

  async atualizar(id: number, parentesco: AtualizarParentescoDTO) {
    await this.parentescoRepository.update(id, parentesco);
  }

  async excluir(id: number) {
    const existeVinculo = await this.estudanteRepository.findOne({
      where: { parentesco: { id } },
    });
    if (existeVinculo) {
      await this.estudanteRepository.update(
        { parentesco: { id } },
        { parentesco: null },
      );
    }
    await this.parentescoRepository.delete(id);
  }
}
