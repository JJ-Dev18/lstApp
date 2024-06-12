import { Router } from 'express'
import { getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria, getGruposCategoria } from '../controllers/categoriaController'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/torneo/:torneoId', ensureAuthenticated , getCategorias)
router.get('/grupos/:categoriaId',ensureAuthenticated, getGruposCategoria)

router.get('/:id', ensureAuthenticated, getCategoria)
router.post('/torneo/:torneoId',ensureAuthenticated, createCategoria)
router.put('/torneo/:id', ensureAuthenticated, updateCategoria)
router.delete('/torneo/:id',ensureAuthenticated, deleteCategoria)

export default router
