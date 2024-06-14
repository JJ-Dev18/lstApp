import { body } from "express-validator";

const createPlanilleroValidation = [
  body('usuarioId').isInt().withMessage('UsuarioId es requerido y debe ser un entero'),
  body('torneoId').isInt().withMessage('TorneoId es requerido y debe ser un entero')
];

const updatePlanilleroValidation = [
  body('usuarioId').optional().isInt().withMessage('UsuarioId debe ser un entero'),
  body('torneoId').optional().isInt().withMessage('TorneoId debe ser un entero')
];

module.exports = {
  createPlanilleroValidation,
  updatePlanilleroValidation
};
