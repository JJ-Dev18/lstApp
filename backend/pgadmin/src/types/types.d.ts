// src/types.d.ts
import { Usuario } from '@prisma/client';
import { Request } from 'express';

declare global {
  namespace Express {
    interface User extends Usuario {}
  }
}

export interface AuthenticatedRequest extends Request {
  user?: Usuario;
}
