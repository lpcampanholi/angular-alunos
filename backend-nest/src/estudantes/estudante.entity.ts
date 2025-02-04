import { ParentescoEntity } from 'src/parentescos/parentesco.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => ParentescoEntity, (parentesco) => parentesco.estudantes, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'parentesco_id' })
  parentesco: ParentescoEntity | null;

  @Column({ name: 'whatsapp', length: 50, nullable: false })
  whatsapp: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
