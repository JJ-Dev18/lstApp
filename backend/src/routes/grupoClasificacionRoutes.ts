import { Router } from 'express'
import { getGruposClasificacion, getGrupoClasificacion, createGrupoClasificacion, updateGrupoClasificacion, deleteGrupoClasificacion, asociarEquipoGrupo, getGruposPorCategoria, eliminarAsociacionEquipo } from '../controllers/grupoClasificacionController'
import { getEquiposDisponibles, getEquiposGrupo } from '../controllers/gruposController'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/', ensureAuthenticated,getGruposClasificacion)
router.get('/:id',ensureAuthenticated, getGrupoClasificacion)
router.get('/equipo/:grupoId',ensureAuthenticated, getEquiposGrupo)
router.get('/equipos-disponibles/:categoriaId',ensureAuthenticated,getEquiposDisponibles );
  
router.get('/:categoriaId', ensureAuthenticated,getGruposPorCategoria)
router.post('/equipos-grupos',ensureAuthenticated, asociarEquipoGrupo )
router.post('/:categoriaId', ensureAuthenticated,createGrupoClasificacion)
router.put('/:id',ensureAuthenticated, updateGrupoClasificacion)
router.delete('/equipos-grupos/:equipoId/:grupoId',ensureAuthenticated, eliminarAsociacionEquipo )
router.delete('/:id', ensureAuthenticated,deleteGrupoClasificacion)



export default router
