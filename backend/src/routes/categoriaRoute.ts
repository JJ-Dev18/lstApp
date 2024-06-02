import { Router } from 'express'
import { getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria } from '../controllers/categoriaController'

const router = Router()

router.get('/', getCategorias)
router.get('/:id', getCategoria)
router.post('/', createCategoria)
router.put('/:id', updateCategoria)
router.delete('/:id', deleteCategoria)

export default router
