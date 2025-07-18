import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AnamneseTypes } from './enums/anamnese-types.enums';
import { Consulta } from './consulta.model';

@Entity('anamneses')
export class Anamnese {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: AnamneseTypes })
  tipoExame: AnamneseTypes;

  @Column()
  cargo: string;

  @Column()
  historicoSaude: string;

  // Relacionamento 1 para 1 com Consulta
  @OneToOne(() => Consulta, (consulta) => consulta.anamnese)
  @JoinColumn() // Define que esta entidade terá a chave estrangeira
  consulta: Consulta;
}