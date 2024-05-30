import { body } from 'express-validator';

const validarRegistroUsuario = [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres')
];

const validarLoginUsuario = [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('El password es requerido')
];

export { validarRegistroUsuario, validarLoginUsuario };
