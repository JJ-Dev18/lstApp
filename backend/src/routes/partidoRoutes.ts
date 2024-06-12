import { Router } from 'express'
import { getPartidos, getPartido, createPartido, updatePartido, deletePartido, actualizarMarcadorPartido, getPartidosPorTorneo } from '../controllers/partidoController'
import { ensureAuthenticated } from '../middlewares/auth'

const router = Router()

router.get('/', ensureAuthenticated, getPartidos)
router.get('/torneo/:torneoId', ensureAuthenticated,getPartidosPorTorneo)
router.get('/:id',ensureAuthenticated, getPartido)
router.post('/', ensureAuthenticated,createPartido)
router.put('/:id', ensureAuthenticated,updatePartido)
router.delete('/:id',ensureAuthenticated,deletePartido)
router.put('/marcador' ,ensureAuthenticated, actualizarMarcadorPartido)


export default router
