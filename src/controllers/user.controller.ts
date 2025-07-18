// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

class UserController {
    async create(req: Request, res: Response) {
        const { nomeCompleto, email, senha, role, cpf, crm, especialidade } = req.body;

        if (!nomeCompleto || !email || !senha || !role || !cpf) {
            res.status(400).json({ message: 'Campos obrigatórios faltando.' });
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(senha, 10);
            const newUser = await userRepository.save({
                nomeCompleto, email, senha: hashedPassword, role, cpf, crm, especialidade
            });
            const { senha: _, ...userWithoutPassword } = newUser;
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            // Erro de cpf duplicado
            res.status(500).json({ message: 'Erro ao criar usuário.' });
        }
    }

    async list(req: Request, res: Response) {
        const users = await userRepository.find({ select: ['id', 'nome', 'role', 'cpf', 'crm'] });
        res.status(200).json(users);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userRepository.findOne({ where: { id }, select: ['id', 'nome', 'role', 'cpf', 'crm'] });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }
        res.status(200).json(user);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, role, cpf } = req.body; 
        await userRepository.update(id, { nome, cpf, role });
        res.status(204).send();
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await userRepository.delete(id);
        res.status(204).send();
    }
}

export default new UserController();