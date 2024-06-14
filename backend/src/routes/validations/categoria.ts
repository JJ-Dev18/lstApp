import { body } from "express-validator";



const validarCategoria = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
]

export { validarCategoria }