import { Router } from 'express'
import { getPartidos, getPartido, createPartido, updatePartido, deletePartido, actualizarMarcadorPartido, getPartidosPorTorneo } from '../controllers/partidoController'

const router = Router()

router.get('/', getPartidos)
router.get('/torneo/:torneoId', getPartidosPorTorneo)
router.get('/:id', getPartido)
router.post('/', createPartido)
router.put('/:id', updatePartido)
router.delete('/:id', deletePartido)
router.put('/marcador' ,actualizarMarcadorPartido)


export default router
