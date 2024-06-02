import { Router } from 'express'
import { getGruposClasificacion, getGrupoClasificacion, createGrupoClasificacion, updateGrupoClasificacion, deleteGrupoClasificacion } from '../controllers/grupoClasificacionController'

const router = Router()

router.get('/', getGruposClasificacion)
router.get('/:id', getGrupoClasificacion)
router.post('/', createGrupoClasificacion)
router.put('/:id', updateGrupoClasificacion)
router.delete('/:id', deleteGrupoClasificacion)

export default router
