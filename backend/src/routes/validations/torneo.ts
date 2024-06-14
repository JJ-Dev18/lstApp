import { body } from "express-validator";

const createTorneoValidation = [
  body('nombre').isString().notEmpty().withMessage('Nombre es requerido'),
  body('usuarioId').isInt().withMessage('UsuarioId es requerido y debe ser un entero')
];

const updateTorneoValidation = [
  body('nombre').optional().isString().notEmpty().withMessage('Nombre debe ser una cadena válida'),
  body('usuarioId').optional().isInt().withMessage('UsuarioId debe ser un entero')
];

module.exports = {
  createTorneoValidation,
  updateTorneoValidation
};
