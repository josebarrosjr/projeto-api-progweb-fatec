import express from 'express';
import { apiKeyAuthMiddleware, baiscAuthMiddleware, jwtAuthMiddleware } from '../middlewares/auth.middleware';
import userRouter from './user.router';
import authRouter from './auth.router';
import consultaRouter from './consulta.router';
import anamneseRouter from './anamnese.router'

const router = express.Router();

router.use('/login', authRouter);
router.use('/users', userRouter);
router.use('/consultations', consultaRouter);
router.use('/anamnese', anamneseRouter);

export default router;