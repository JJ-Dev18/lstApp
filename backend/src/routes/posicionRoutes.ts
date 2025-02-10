import { Router } from "express";
import { actualizarPosiciones, getTablaPosicionesGeneral, getTablaPosicionesGrupos, inicializarPosiciones } from "../controllers/posicionController";


const router = Router();

router.get('/:torneoId/:categoriaId',getTablaPosicionesGeneral)
router.get('/:torneoId/:categoriaId/:grupoId',getTablaPosicionesGrupos)
router.post('/actualizar/:partidoId', actualizarPosiciones)
router.post('/iniciar/:torneoId/:categoriaId/:grupoId?', inicializarPosiciones)

export default router
