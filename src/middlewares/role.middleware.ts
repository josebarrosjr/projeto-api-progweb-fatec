import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/enums/user-role.enums';

export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (allowedRoles.includes(role as UserRole)) {
      return next();
    }
    res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
  };
};