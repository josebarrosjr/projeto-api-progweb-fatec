import { AppDataSource } from "../data-source";
import { Consulta } from "../models/consulta.model";
import { ConsultationStatus } from "../models/enums/consulta-status.enum";
import { UserRole } from "../models/enums/user-role.enums";

export const consultaRepository = AppDataSource.getRepository(Consulta).extend({

    async criarConsulta(pacienteId: string): Promise<Consulta> {
        const novaConsulta = this.create({
            paciente: { id: pacienteId },
            status: ConsultationStatus.SOLICITADA,
        });

        return this.save(novaConsulta);
    },

    async findByUserRole(user: { userId: string; role: UserRole }): Promise<Consulta[]> {
        const queryBuilder = this.createQueryBuilder("consulta")
            .leftJoinAndSelect("consulta.paciente", "paciente")
            .leftJoinAndSelect("consulta.medico", "medico")
            .orderBy("consulta.dataAgendamento", "DESC");

        if (user.role === UserRole.PACIENTE) {
            queryBuilder.where("consulta.paciente.id = :userId", { userId: user.userId });
        }

        if (user.role === UserRole.MEDICO) {
            queryBuilder.where("consulta.medico.id = :userId", { userId: user.userId });
        }

        return queryBuilder.getMany();
    },
});