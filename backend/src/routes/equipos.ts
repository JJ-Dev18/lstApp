import express from 'express';
import prisma from '../config/database';


const router = express.Router()

router.get('/', async (req ,res ) => {
    try {
        const equipos = await prisma.equipo.findMany()
        res.status(200).json( equipos)
        
    } catch (error) {
        res.status(500).json({error : error})
    }
})

router.get('/:equipoId', async ( req ,res ) => {
    try {
        const { equipoId } = req.params
        const equipo = await prisma.equipo.findFirst({
            where : {
                id : Number(equipoId)
            }
        })
        res.status(200).json( equipo)
        
    } catch (error) {
        res.status(500).json({error : error})
    }
})

router.post( '/' , async (req,res) => {
    try {
        const { ...data } = req.body
        const equipo = await prisma.equipo.create({
            data : data 
        })
        res.status(200).json(equipo)
    } catch (error) {
        res.status(500).json({error : error})
    }

})

router.delete('/:equipoId', async (req,res) => {
    try {
        const { equipoId } = req.params
        const deleteUser = await prisma.equipo.delete({
            where: {
              id: Number(equipoId),
            },
          })
        res.status(200).json({message : 'Equipo eliminado exitosamente'})  
    } catch (error) {
        res.status(500).json({error : error})
        
    }
})

export { router as EquiposRouter }