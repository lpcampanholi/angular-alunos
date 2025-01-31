import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'estudantes' })
export class EstudanteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_completo', length: 100, nullable: false })
  nomeCompleto: string;

  @Column({ name: 'endereco', length: 70, nullable: false })
  endereco: string;

  @Column({ name: 'bairro', length: 50, nullable: false })
  bairro: string;

  @Column({ name: 'responsavel', length: 100, nullable: false })
  responsavel: string;

  @Column({ name: 'parentesco_id' })
  parentescoId: number;

  @Column({ name: 'whatsapp', length: 50, nullable: false })
  whatsapp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
