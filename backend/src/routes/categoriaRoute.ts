import { Router } from 'express'
import { getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria, getGruposCategoria } from '../controllers/categoriaController'

const router = Router()

router.get('/torneo/:torneoId', getCategorias)
router.get('/grupos/:categoriaId', getGruposCategoria)

router.get('/:id', getCategoria)
router.post('/torneo/:torneoId', createCategoria)
router.put('/torneo/:id', updateCategoria)
router.delete('/torneo/:id', deleteCategoria)

export default router
