import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../models/user.model';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/enums/user-role.enums';


export const baiscAuthMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Autenticação necessária' });
        return;
    }
    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
        res.status(401).json({ message: 'Autenticação necessária' });
        return;
    }

    const decodedCredentials = Buffer.from(credentials, 'base64').toString('ascii');
    const [username, password] = decodedCredentials.split(':');

    if (!username || !password) {
        res.status(401).json({ message: 'Autenticação necessária' });
        return;
    }

    try {
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOne({ where: { nome: username } });

        if (!user) {
            res.status(401).json({ message: 'Autenticação necessária' });
            return;
        }

        const isPasswordValid = await compare(password, user.senha);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Autenticação necessária' });
            return;
        }
        
        next();

    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
        return;
    }
};

export const apiKeyAuthMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
        res.status(401).json({ message: 'API Key não fornecida ou inválida.' });
        return;
    }

    if (apiKey != process.env.API_KEY) {
        res.status(401).json({ message: 'Acesso negado. API Key inválida.' });
        return;
    }
  
    next();
};

declare global {
  namespace Express {
    interface Request {
      user: { userId: string; role: UserRole };
    }
  }
}

export const jwtAuthMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as { userId: string; role: UserRole };

        req.user = decodedPayload;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expirado.' });
            return;
        }
        
        res.status(401).json({ message: 'Token inválido.' });
        return;
    }
};
