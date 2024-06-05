import { Router } from 'express'
import { getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo } from '../controllers/equipoController'

const router = Router()

router.get('/torneo/:torneoId', getEquipos)
router.get('/:id', getEquipo)
router.post('/', createEquipo)
router.put('/torneo/:id', updateEquipo)
router.delete('/torneo/:id', deleteEquipo)

export default router
