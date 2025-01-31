import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarParentescoDTO } from './dto/listar-parentesco-dto';
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

  async buscarUm(id: number): Promise<ParentescoEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async listar(): Promise<ListarParentescoDTO[]> {
    const usuariosSalvos = await this.repository.find();
    const parentescosLista = usuariosSalvos.map(
      (parentesco) => new ListarParentescoDTO(parentesco.id, parentesco.nome),
    );
    return parentescosLista;
  }

  async criar(novoParentesco: CriarParentescoDTO) {
    const parentescoEntity: ParentescoEntity = new ParentescoEntity();
    parentescoEntity.nome = novoParentesco.nome;
    await this.repository.save(parentescoEntity);
  }

  async atualizar(id: number, parentesco: AtualizarParentescoDTO) {
    await this.repository.update(id, parentesco);
  }

  async excluir(id: number) {
    await this.repository.delete(id);
  }
}
