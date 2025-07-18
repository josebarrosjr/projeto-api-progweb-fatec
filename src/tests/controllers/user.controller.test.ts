import { getMockReq, getMockRes } from '@jest-mock/express';
import UserController from '../../controllers/user.controller';
import { userRepository } from '../../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../models/enums/user-role.enums';

jest.mock('../../repositories/user.repository.ts');
jest.mock('bcrypt');

describe('User Controller (Unitário)', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um novo usuário e retornar status 201', async () => {

        const req = getMockReq({
            body: {
                nomeCompleto: 'Novo Usuário',
                email: 'novo@email.com',
                senha: 'senhaforte123',
                role: UserRole.PACIENTE,
                cpf: '98765432100',
            }
        });
        const { res } = getMockRes();

        (bcrypt.hash as jest.Mock).mockResolvedValue('senhaHasheada');

        const mockUserCriado = {
            id: 'user-uuid-2',
            nomeCompleto: 'Novo Usuário',
            email: 'novo@email.com',
            role: UserRole.PACIENTE,
            cpf: '98765432100',
        };
        (userRepository.save as jest.Mock).mockResolvedValue(mockUserCriado);

        await UserController.create(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith('senhaforte123', 10);
        
        expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            senha: 'senhaHasheada'
        }));
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.not.objectContaining({
            senha: expect.any(String)
        }));
    });
});