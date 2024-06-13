import { body } from "express-validator";


const validarEquipo = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
]

export { validarEquipo };