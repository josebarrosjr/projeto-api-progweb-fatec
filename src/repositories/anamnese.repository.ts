import { AppDataSource } from "../data-source";
import { Anamnese } from "../models/anamnese.model";
import { Consulta } from "../models/consulta.model";
import { ConsultationStatus } from "../models/enums/consulta-status.enum";

type AnamneseCreateData = Omit<Anamnese, 'id' | 'createdAt' | 'updatedAt' | 'consulta'> & {
    consultaId: string;
};

export const anamneseRepository = AppDataSource.getRepository(Anamnese).extend({

    async criarAnamnese(id: AnamneseCreateData): Promise<Anamnese> {
        const consulta = await AppDataSource.getRepository(Consulta).findOneBy({ id: id.consultaId });

        if (!consulta) {
            throw new Error("A consulta associada não foi encontrada.");
        }

        if (consulta.status !== ConsultationStatus.REALIZADA) {
            throw new Error("A anamnese só pode ser criada para consultas com status 'REALIZADA'.");
        }

        const novaAnamnese = this.create({
            ...id,
            consulta: { id: id.consultaId },
        });

        return this.save(novaAnamnese);
    },

    async findByConsultaId(consultaId: string): Promise<Anamnese | null> {
        return this.findOne({
            where: { consulta: { id: consultaId } },
            relations: ['consulta'],
        });
    },

});