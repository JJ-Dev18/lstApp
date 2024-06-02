import { Router } from 'express'
import { getJugadores, getJugador, createJugador, updateJugador, deleteJugador } from '../controllers/jugadorController'

const router = Router()

router.get('/', getJugadores)
router.get('/:id', getJugador)
router.post('/', createJugador)
router.put('/:id', updateJugador)
router.delete('/:id', deleteJugador)

export default router
