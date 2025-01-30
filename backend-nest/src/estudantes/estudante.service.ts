import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarEstudanteDTO } from './dto/listar-estudante-dto';
import { EstudanteEntity } from './estudante.entity';
import { Repository } from 'typeorm';
import { AtualizarEstudanteDTO } from './dto/atualizar-estudante-dto';
import { CriarEstudanteDTO } from './dto/criar-estudante.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EstudanteService {
  constructor(
    @InjectRepository(EstudanteEntity)
    private readonly estudanteRepository: Repository<EstudanteEntity>,
  ) {}

  async buscarUm(id: string): Promise<EstudanteEntity | null> {
    return await this.estudanteRepository.findOneBy({ id });
  }

  async listar() {
    const usuariosSalvos = await this.estudanteRepository.find();
    const usersList = usuariosSalvos.map(
      (estudante) =>
        new ListarEstudanteDTO(
          estudante.nomeCompleto,
          estudante.endereco,
          estudante.bairro,
          estudante.responsavel,
          estudante.parentescoId,
          estudante.whatsapp,
        ),
    );
    return usersList;
  }

  async criar(novoEstudante: CriarEstudanteDTO): Promise<ListarEstudanteDTO> {
    const estudanteEntity: EstudanteEntity = new EstudanteEntity();
    estudanteEntity.id = uuid();
    estudanteEntity.nomeCompleto = novoEstudante.nomeCompleto;
    estudanteEntity.endereco = novoEstudante.endereco;
    estudanteEntity.bairro = novoEstudante.bairro;
    estudanteEntity.responsavel = novoEstudante.responsavel;
    estudanteEntity.parentescoId = novoEstudante.parentescoId;
    estudanteEntity.whatsapp = novoEstudante.whatsapp;
    await this.estudanteRepository.save(estudanteEntity);
    return new ListarEstudanteDTO(
      estudanteEntity.nomeCompleto,
      estudanteEntity.endereco,
      estudanteEntity.bairro,
      estudanteEntity.responsavel,
      estudanteEntity.parentescoId,
      estudanteEntity.whatsapp,
    );
  }

  async atualizar(id: string, student: AtualizarEstudanteDTO): Promise<void> {
    const estudanteEntity = await this.estudanteRepository.findOneBy({ id });
    if (estudanteEntity) {
      Object.assign(estudanteEntity, student);
      await this.estudanteRepository.save(estudanteEntity);
    }
  }

  async excluir(id: string): Promise<void> {
    await this.estudanteRepository.delete(id);
  }
}
