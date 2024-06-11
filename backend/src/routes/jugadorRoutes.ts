import { Router } from 'express'
import { getJugadores, getJugador, createJugador, updateJugador, deleteJugador } from '../controllers/jugadorController'

const router = Router()

router.get('/equipo/:equipoId', getJugadores)
router.get('/:id', getJugador)
router.post('/equipo/:equipoId', createJugador)
router.put('/:id', updateJugador)
router.delete('/:id', deleteJugador)

export default router
