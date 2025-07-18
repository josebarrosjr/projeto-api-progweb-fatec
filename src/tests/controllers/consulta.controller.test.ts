import { getMockReq, getMockRes } from '@jest-mock/express'; 
import ConsultaController from '../../controllers/consulta.controller';
import { consultaRepository } from '../../repositories/consulta.repository';

jest.mock('../../repositories/consulta.repository.ts');

describe('Consulta Controller (Unitário)', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar uma consulta com sucesso e retornar status 201', async () => {
    const req = getMockReq({
        user: { id: 'paciente-uuid-123', role: 'PACIENTE' },
        body: {},
    });
    const { res } = getMockRes();

    const mockConsultaCriada = {
        id: 'consulta-uuid-456',
        status: 'SOLICITADA',
        paciente: { id: 'paciente-uuid-123' }
    };
    (consultaRepository.criarConsulta as jest.Mock).mockResolvedValue(mockConsultaCriada);

    await ConsultaController.create(req, res);

    expect(consultaRepository.criarConsulta).toHaveBeenCalledWith('paciente-uuid-123');
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockConsultaCriada);
});

    it('deve retornar status 400 se a data de agendamento não for fornecida', async () => {
        const req = getMockReq({
            user: { id: 'paciente-123', role: 'PACIENTE' },
            body: {},
        });
        const { res } = getMockRes();

        await ConsultaController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'A data de agendamento é obrigatória.' });
        
        expect(consultaRepository.criarConsulta).not.toHaveBeenCalled();
    });
});