import { EstudanteEntity } from 'src/estudantes/estudante.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'parentescos' })
export class ParentescoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @OneToMany(() => EstudanteEntity, (estudante) => estudante.parentesco)
  estudantes: EstudanteEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
