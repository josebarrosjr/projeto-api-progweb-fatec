import { Request, Response } from 'express';
import { anamneseRepository } from '../repositories/anamnese.repository';
import { consultaRepository } from '../repositories/consulta.repository';

class AnamneseController {

    async create(req: Request, res: Response) {
        try {
            const novaAnamnese = await anamneseRepository.criarAnamnese(req.body);
            res.status(201).json(novaAnamnese);
        } catch (error: any) {
            if (error.message.includes("A consulta") || error.message.includes("A anamnese")) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async getByConsultaId(req: Request, res: Response) {
        const { consultaId } = req.params;
        const loggedInUser = req.user;

        try {
            const consulta = await consultaRepository.findOne({
                where: { id: consultaId },
                relations: ['paciente', 'medico']
            });

            if (!consulta) {
                res.status(404).json({ message: "Consulta não encontrada." });
                return;
            }

            const isOwner = consulta.paciente?.id === loggedInUser.userId || consulta.medico?.id === loggedInUser.userId;

            if (!isOwner) {
                res.status(403).json({ message: "Acesso negado." });
                return; 
            }

            const anamnese = await anamneseRepository.findByConsultaId(consultaId);

            if (!anamnese) {
                res.status(404).json({ message: "Anamnese para esta consulta ainda não foi criada." });
                return;
            }

            res.status(200).json(anamnese);

        } catch (error) {
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}

export default new AnamneseController();