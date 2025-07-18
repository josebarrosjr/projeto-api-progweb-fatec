import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { UserRole } from '../models/enums/user-role.enums';

const userRouter = Router();

userRouter.use(jwtAuthMiddleware, roleMiddleware([UserRole.ADMIN]));

userRouter.post('/', UserController.create); // Criar novo usuário (paciente, médico ou admin)
userRouter.get('/', UserController.list); // Listar todos os usuários
userRouter.get('/:id', UserController.getById); // Buscar um usuário por ID
userRouter.patch('/:id', UserController.update); // Atualizar um usuário
userRouter.delete('/:id', UserController.delete); // Deletar um usuário

export default userRouter;