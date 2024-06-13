import { Router } from 'express'
import { getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo, getEquiposPorCategoria, getEquiposPorGrupo } from '../controllers/equipoController'
import upload from '../middlewares/multerconfig'
import { ensureAuthenticated } from '../middlewares/auth'
import { multerDynamicMiddleware } from '../middlewares/multerErrorMiddleware'
import { validarEquipo } from './validations/equipo'
import { validarCampos } from '../middlewares/validar-campos'

const router = Router()

router.get('/torneo/:torneoId',ensureAuthenticated, getEquipos)
router.get('/categoria/:categoriaId', ensureAuthenticated, getEquiposPorCategoria)
router.get('/grupos/:grupoId', ensureAuthenticated,getEquiposPorGrupo)

router.get('/:id',ensureAuthenticated, getEquipo)
router.post('/torneo/:torneoId',multerDynamicMiddleware('logo'),ensureAuthenticated,validarEquipo,validarCampos, createEquipo)
router.put('/torneo/:id', multerDynamicMiddleware('logo'),ensureAuthenticated, validarEquipo,validarCampos, updateEquipo)
router.delete('/torneo/:id',ensureAuthenticated, deleteEquipo)

export default router
