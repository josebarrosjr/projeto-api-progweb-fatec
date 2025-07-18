import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { hash } from 'bcrypt';
import { UserRole } from './enums/user-role.enums';
import { Consulta } from "./consulta.model";


@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    nome: string;

    @Column()
    senha: string;

    @BeforeInsert()
    async hashPassword() {
        this.senha = await hash(this.senha, 10);
    }

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ unique: true })
    cpf: number;

    @Column({ nullable: true }) // Apenas para médicos
    crm?: string;

    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consultasComoPaciente: Consulta[];

    @OneToMany(() => Consulta, (consulta) => consulta.medico)
    consultasComoMedico: Consulta[];
}