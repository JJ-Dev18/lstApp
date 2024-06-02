import { Router } from 'express'
import { getUsuario, getUsuarios, createUsuario, updateUsuario,deleteUsuario } from '../controllers/usuarioController'

const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', createUsuario)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
