import { body } from "express-validator";



const validarJugador = [
    body('*.nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('*.documento').notEmpty().withMessage('El documento es obligatorio'),
    body('*.numero').notEmpty().withMessage('El numero es obligatorio'),
    body('*.eps').notEmpty().withMessage('El eps es obligatorio')


]

export { validarJugador }