import { Router } from 'express'
import { getGruposClasificacion, getGrupoClasificacion, createGrupoClasificacion, updateGrupoClasificacion, deleteGrupoClasificacion, asociarEquipoGrupo, getGruposPorCategoria, eliminarAsociacionEquipo } from '../controllers/grupoClasificacionController'
import { getEquiposDisponibles, getEquiposGrupo } from '../controllers/gruposController'

const router = Router()

router.get('/', getGruposClasificacion)
router.get('/:id', getGrupoClasificacion)
router.get('/equipo/:grupoId', getEquiposGrupo)
router.get('/equipos-disponibles/:categoriaId',getEquiposDisponibles );
  
router.get('/:categoriaId', getGruposPorCategoria)
router.post('/equipos-grupos', asociarEquipoGrupo )
router.post('/:categoriaId', createGrupoClasificacion)
router.put('/:id', updateGrupoClasificacion)
router.delete('/equipos-grupos/:equipoId/:grupoId', eliminarAsociacionEquipo )
router.delete('/:id', deleteGrupoClasificacion)



export default router
