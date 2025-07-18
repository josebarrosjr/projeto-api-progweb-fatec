import { getMockReq, getMockRes } from '@jest-mock/express';
import AnamneseController from '../../controllers/anamnese.controller';
import { anamneseRepository } from '../../repositories/anamnese.repository';
import { AnamneseTypes } from '../../models/enums/anamnese-types.enums';

jest.mock('../../repositories/anamnese.repository.ts');

describe('Anamnese Controller (Unitário)', () => {

    it('deve criar uma nova anamnese com um tipo de exame válido', async () => {
        const dadosAnamnese = {
            consultaId: 'consulta-uuid-realizada',
            tipoExame: AnamneseTypes.PERIODIOCO,
            cargo: 'Analista de Sistemas',
            historicoSaude: 'Tudo OK',
        };
        const req = getMockReq({ body: dadosAnamnese });
        const { res } = getMockRes();

        const mockAnamneseCriada = { id: 'anamnese-uuid-2', ...dadosAnamnese };
        (anamneseRepository.criarAnamnese as jest.Mock).mockResolvedValue(mockAnamneseCriada);

        await AnamneseController.create(req, res);

        expect(anamneseRepository.criarAnamnese).toHaveBeenCalledWith(dadosAnamnese);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockAnamneseCriada);
    });

    it('deve retornar status 400 se o repositório lançar um erro de regra de negócio', async () => {
        const req = getMockReq({ body: { consultaId: 'consulta-nao-realizada' } });
        const { res } = getMockRes();

        const erroDeNegocio = new Error("A anamnese só pode ser criada para consultas com status 'REALIZADA'.");
        (anamneseRepository.criarAnamnese as jest.Mock).mockRejectedValue(erroDeNegocio);
        
        await AnamneseController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: erroDeNegocio.message });
    });
});