import { Router } from 'express';
import ConsultaController from '../controllers/consulta.controller';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { UserRole } from '../models/enums/user-role.enums';

const router = Router();

// Paciente solicita consulta
router.post('/', jwtAuthMiddleware, roleMiddleware([UserRole.PACIENTE]), ConsultaController.create);

// Admin atribui médico
router.patch('/:id/assign-doctor', jwtAuthMiddleware, roleMiddleware([UserRole.ADMIN]), ConsultaController.assignDoctor);

// Rota para listar consultas
router.get('/', jwtAuthMiddleware, ConsultaController.list);

// Rota para buscar uma consulta específica por ID
router.get('/:id', jwtAuthMiddleware, ConsultaController.getById);

router.patch('/:id/status', jwtAuthMiddleware, ConsultaController.updateStatus);

export default router;