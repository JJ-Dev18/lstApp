import express, { Request, Response } from 'express';
import prisma from '../config/database';



const router = express.Router()

router.get('/', async ( req : Request , res : Response) => {
    try {
        const categorias = await prisma.categoria.findMany() 
        res.status(200).json(categorias)
    } catch (error) {
        
    }
})
router.post('/', async ( req : Request , res : Response) => {
    try {
        const { ...data} = req.body
        const categorias = await prisma.categoria.create({
            data : data
        }) 
        res.status(200).json(categorias)
    } catch (error) {
        
    }
})

export { router as CategoriasRouter}