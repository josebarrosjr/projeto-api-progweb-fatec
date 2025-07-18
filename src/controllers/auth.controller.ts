import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../models/user.model';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(req: Request, res: Response) {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        return;
    }

    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOne({ where: { cpf } });

        if (!user || !(await compare(senha, user.senha))) {
            res.status(401).json({ message: 'Credenciais inválidas.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        );

        res.json({ message: 'Login bem-sucedido!', token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

export default {
    login
}