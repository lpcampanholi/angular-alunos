import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentescoEntity } from './parentesco.entity';
import { Repository } from 'typeorm';
import { CriarParentescoDTO } from './dto/criar-parentesco.dto';
import { AtualizarParentescoDTO } from './dto/atualizar-parentesco-dto';

@Injectable()
export class ParentescoService {
  constructor(
    @InjectRepository(ParentescoEntity)
    private readonly repository: Repository<ParentescoEntity>,
  ) {}

  async buscarUm(id: number): Promise<ParentescoEntity> {
    const parentesco = await this.repository.findOneBy({ id });
    if (parentesco) {
      return parentesco;
    } else {
      throw new NotFoundException('Parentesco não encontrado');
    }
  }

  async listar(): Promise<ParentescoEntity[]> {
    const parentescos = await this.repository.find();
    return parentescos;
  }

  async criar(novoParentesco: CriarParentescoDTO) {
    await this.repository.save(novoParentesco);
  }

  async atualizar(id: number, parentesco: AtualizarParentescoDTO) {
    await this.repository.update(id, parentesco);
  }

  async excluir(id: number) {
    await this.repository.delete(id);
  }
}
