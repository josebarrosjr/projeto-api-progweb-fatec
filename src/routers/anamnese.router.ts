import { Router } from 'express';
import AnamneseController from '../controllers/anamnese.controller';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { UserRole } from '../models/enums/user-role.enums';

const anamneseRouter = Router();

anamneseRouter.post(
    '/',
    jwtAuthMiddleware,
    roleMiddleware([UserRole.MEDICO]),
    AnamneseController.create
);

anamneseRouter.get(
    '/by-consultation/:consultaId',
    jwtAuthMiddleware,
    AnamneseController.getByConsultaId
);

export default anamneseRouter;