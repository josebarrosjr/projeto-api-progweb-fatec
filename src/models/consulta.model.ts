import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { ConsultationStatus } from './enums/consulta-status.enum';
import { Anamnese } from './anamnese.model';
import { Usuario } from './user.model';


@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ConsultationStatus, default: ConsultationStatus.SOLICITADA })
  status: ConsultationStatus;
  
  // Relacionamentos
  @ManyToOne(() => Usuario, (usuario) => usuario.consultasComoPaciente)
  paciente: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.consultasComoMedico, { nullable: true }) // Pode ser nulo no início
  medico: Usuario;

  @OneToOne(() => Anamnese, (anamnese) => anamnese.consulta)
  anamnese: Anamnese;

}