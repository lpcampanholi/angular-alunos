import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarEstudanteDTO } from './dto/listar-estudante-dto';
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

  async buscarUm(id: number): Promise<EstudanteEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async listar(): Promise<ListarEstudanteDTO[]> {
    const usuariosSalvos = await this.repository.find();
    const listaEstudantes = usuariosSalvos.map(
      (estudante) =>
        new ListarEstudanteDTO(
          estudante.id,
          estudante.nomeCompleto,
          estudante.endereco,
          estudante.bairro,
          estudante.responsavel,
          estudante.parentescoId,
          estudante.whatsapp,
        ),
    );
    return listaEstudantes;
  }

  async criar(novoEstudante: CriarEstudanteDTO) {
    const estudanteEntity: EstudanteEntity = new EstudanteEntity();
    estudanteEntity.nomeCompleto = novoEstudante.nomeCompleto;
    estudanteEntity.endereco = novoEstudante.endereco;
    estudanteEntity.bairro = novoEstudante.bairro;
    estudanteEntity.responsavel = novoEstudante.responsavel;
    estudanteEntity.parentescoId = novoEstudante.parentescoId;
    estudanteEntity.whatsapp = novoEstudante.whatsapp;
    await this.repository.save(estudanteEntity);
  }

  async atualizar(id: number, estudante: AtualizarEstudanteDTO) {
    await this.repository.update(id, estudante);
  }

  async excluir(id: number) {
    await this.repository.delete(id);
  }
}
