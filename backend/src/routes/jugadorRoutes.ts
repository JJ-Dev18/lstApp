import { Router } from 'express'
import { getJugadores, getJugador, createJugador, updateJugador, deleteJugador } from '../controllers/jugadorController'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/equipo/:equipoId',ensureAuthenticated, getJugadores)
router.get('/:id', ensureAuthenticated, getJugador)
router.post('/equipo/:equipoId',ensureAuthenticated, createJugador)
router.put('/:id', ensureAuthenticated, updateJugador)
router.delete('/:id',ensureAuthenticated, deleteJugador)

export default router
