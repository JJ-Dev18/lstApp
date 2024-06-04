import { Router } from 'express'
import { getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo } from '../controllers/equipoController'

const router = Router()

router.get('/:userId', getEquipos)
router.get('/:id', getEquipo)
router.post('/', createEquipo)
router.put('/:id', updateEquipo)
router.delete('/:id', deleteEquipo)

export default router
