import express, { Request, Response } from "express";
import dotenv from "dotenv";
import 'reflect-metadata';

import { AppDataSource } from "./data-source";
import routers from './routers';
import { loggerMiddleware } from './middlewares/logger.middleware';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log('🎉 Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar com o banco de dados:', err);
        process.exit(1);
    });

const app = express();


app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", loggerMiddleware, routers);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Endpoint não encontrado.' });
});

const PORT = process.env.PORT || 12345;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    
    // Mensagem específica para o ambiente local
    if (process.env.NODE_ENV !== 'production') {
        console.log(`📚 Documentação da API disponível em: http://localhost:${PORT}/docs`);
    }
});