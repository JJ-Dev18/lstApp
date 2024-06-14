import { body } from "express-validator";

const createPartidoValidation = [
  body('equipo1Id').isInt().withMessage('Equipo1Id es requerido y debe ser un entero'),
  body('equipo2Id').isInt().withMessage('Equipo2Id es requerido y debe ser un entero'),
  body('fecha').isISO8601().toDate().withMessage('Fecha es requerida y debe ser una fecha válida'),
  body('duracion').isInt().withMessage('Duracion es requerida y debe ser un entero'),
  body('categoriaId').isInt().withMessage('CategoriaId es requerida y debe ser un entero'),
  body('estado').isString().notEmpty().withMessage('Estado es requerido'),
  body('torneoId').isInt().withMessage('TorneoId es requerido y debe ser un entero'),
  body('planilleroId').isInt().withMessage('PlanilleroId es requerido y debe ser un entero')
];

const updatePartidoValidation = [
  body('equipo1Id').optional().isInt().withMessage('Equipo1Id debe ser un entero'),
  body('equipo2Id').optional().isInt().withMessage('Equipo2Id debe ser un entero'),
  body('fecha').optional().isISO8601().toDate().withMessage('Fecha debe ser una fecha válida'),
  body('duracion').optional().isInt().withMessage('Duracion debe ser un entero'),
  body('categoriaId').optional().isInt().withMessage('CategoriaId debe ser un entero'),
  body('estado').optional().isString().notEmpty().withMessage('Estado debe ser una cadena válida'),
  body('torneoId').optional().isInt().withMessage('TorneoId debe ser un entero'),
  body('planilleroId').optional().isInt().withMessage('PlanilleroId debe ser un entero')
];

module.exports = {
  createPartidoValidation,
  updatePartidoValidation
};
