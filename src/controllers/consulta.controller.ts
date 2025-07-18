import { Request, Response } from 'express';
import { consultaRepository } from '../repositories/consulta.repository';
import { ConsultationStatus } from '../models/enums/consulta-status.enum';
import { UserRole } from '../models/enums/user-role.enums';

class ConsultaController {
    async create(req: Request, res: Response) {
        const pacienteId = req.user.userId;

        try {
            const novaConsulta = await consultaRepository.criarConsulta(pacienteId);
            res.status(201).json(novaConsulta);
        } catch (error) {
            res.status(500).json({ message: 'Erro interno ao criar a consulta.' });
        }
    }

    async assignDoctor(req: Request, res: Response) {
        const { id } = req.params;
        const { medicoId } = req.body;

        if (!medicoId) {
            res.status(400).json({ message: 'O ID do médico é obrigatório.' });
            return;
        }

        try {
            await consultaRepository.update(id, {
                medico: { id: medicoId },
                status: ConsultationStatus.AGENDADA
            });

            res.status(200).json({ message: 'Médico atribuído com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno ao atribuir médico.' });
        }
    }

    async list(req: Request, res: Response) {
        const consultas = await consultaRepository.findByUserRole(req.user);
        res.status(200).json(consultas);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const consulta = await consultaRepository.findOne({ where: { id }, relations: ['paciente', 'medico'] });

        if (!consulta) {
            res.status(404).json({ message: "Consulta não encontrada." });
            return;
        }

        // Verifica se o usuário logado pode ver esta consulta
        const isOwner = req.user.userId === consulta.paciente?.id || req.user.userId === consulta.medico?.id;
        if (req.user.role !== UserRole.ADMIN && !isOwner) {
            res.status(403).json({ message: "Acesso negado." });
            return;
        }

        res.status(200).json(consulta);
    }

    async updateStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !Object.values(ConsultationStatus).includes(status)) {
            res.status(400).json({ message: 'Status inválido.' });
            return;
        }

        await consultaRepository.update(id, { status });
        res.status(204).send();
    }
}

export default new ConsultaController();