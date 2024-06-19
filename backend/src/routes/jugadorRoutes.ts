import { Router } from 'express'
import { getJugadores, getJugador, createJugador, updateJugador, deleteJugador } from '../controllers/jugadorController'
import { ensureAuthenticated } from '../middlewares/auth'
import { validarJugador } from './validations/jugadores'
import { validarCampos } from '../middlewares/validar-campos'

const router = Router()

router.get('/equipo/:equipoId',ensureAuthenticated, getJugadores)
router.get('/:id', ensureAuthenticated, getJugador)
router.post('/equipo/:equipoId',ensureAuthenticated, validarJugador,validarCampos, createJugador)
router.put('/:id', ensureAuthenticated, updateJugador)
router.delete('/:id',ensureAuthenticated, deleteJugador)

export default router
