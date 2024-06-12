import { Router } from 'express'
import { getEquipos, getEquipo, createEquipo, updateEquipo, deleteEquipo, getEquiposPorCategoria, getEquiposPorGrupo } from '../controllers/equipoController'
import upload from '../multerconfig'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/torneo/:torneoId',ensureAuthenticated, getEquipos)
router.get('/categoria/:categoriaId', ensureAuthenticated, getEquiposPorCategoria)
router.get('/grupos/:grupoId', ensureAuthenticated,getEquiposPorGrupo)

router.get('/:id',ensureAuthenticated, getEquipo)
router.post('/torneo/:torneoId',upload.single('logo'),ensureAuthenticated, createEquipo)
router.put('/torneo/:id', upload.single('logo'),ensureAuthenticated, updateEquipo)
router.delete('/torneo/:id',ensureAuthenticated, deleteEquipo)

export default router
