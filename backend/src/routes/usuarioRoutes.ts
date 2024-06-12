import { Router } from 'express'
import { getUsuario, getUsuarios, createUsuario, updateUsuario,deleteUsuario } from '../controllers/usuarioController'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/', ensureAuthenticated,getUsuarios)
router.get('/:id', ensureAuthenticated,getUsuario)
router.post('/', ensureAuthenticated,createUsuario)
router.put('/:id',ensureAuthenticated, updateUsuario)
router.delete('/:id',ensureAuthenticated, deleteUsuario)

export default router
