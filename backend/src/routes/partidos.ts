import express from 'express';
import prisma from '../config/database';


const router = express.Router();

router.get('/', async  (req,res) => {
    const partidos = await prisma.partido.findMany()
    res.json(partidos)
});


export default router;
