import { Router } from 'express'
import { getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo, getEquiposPorCategoria, getEquiposPorGrupo } from '../controllers/equipoController'

const router = Router()

router.get('/torneo/:torneoId', getEquipos)
router.get('/categoria/:categoriaId', getEquiposPorCategoria)
router.get('/grupos/:grupoId', getEquiposPorGrupo)

router.get('/:id', getEquipo)
router.post('/torneo/:torneoId', createEquipo)
router.put('/torneo/:id', updateEquipo)
router.delete('/torneo/:id', deleteEquipo)

export default router
