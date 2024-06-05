import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPartidos = async (req: Request, res: Response) => {
  try {
    const partidos = await prisma.partido.findMany({
        include: {
         equipo1 : true ,
         equipo2 : true ,
         categoria: true ,
         eventos: true,
        },
      })
    res.json(partidos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getPartidosPorTorneo = async (req: Request, res: Response) => {
  try {
    const { torneoId } = req.params
    const partidos = await prisma.partido.findMany({
      where : {
         torneoId : Number(torneoId)
      },
        include: {
         equipo1 : true ,
         equipo2 : true ,
         categoria: true ,
         eventos: true,
        },
      })
    res.json(partidos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getPartido = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const partido = await prisma.partido.findUnique({ where: { id: Number(id) }, include: {
        equipo1 : true ,
        equipo2 : true ,
        categoria: true ,
        eventos: {
           include:{
               jugador : {
                   include :{
                       equipo: true
                   }
               }
               
           }
        },
       } })
    if (!partido) {
      return res.status(404).json({ error: 'Partido not found' })
    }
    res.json(partido)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createPartido = async (req: Request, res: Response) => {
  try {
    const { equipo1Id, equipo2Id, fecha, duracion, categoriaId, marcadorEquipo1, marcadorEquipo2, estado } = req.body
    const newPartido = await prisma.partido.create({
      data: { equipo1Id, equipo2Id, fecha, duracion, categoriaId, marcadorEquipo1, marcadorEquipo2, estado }
    })
    res.status(201).json(newPartido)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updatePartido = async (req: Request, res: Response) => {
  const { id } = req.params
  const { equipo1Id, equipo2Id, fecha, duracion, categoriaId, marcadorEquipo1, marcadorEquipo2, estado } = req.body
  try {
    const updatedPartido = await prisma.partido.update({
      where: { id: Number(id) },
      data: { equipo1Id, equipo2Id, fecha, duracion, categoriaId, marcadorEquipo1, marcadorEquipo2, estado }
    })
    res.json(updatedPartido)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deletePartido = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.partido.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const actualizarMarcadorPartido = async (req: Request, res: Response)=> { 
    const { partidoId , marcadorEquipo1 , marcadorEquipo2 } = req.body 
    const partidoActualizado = await prisma.partido.update({
        where: { id: partidoId },
        data: {
          marcadorEquipo1: marcadorEquipo1,
          marcadorEquipo2: marcadorEquipo2,
        },
    })
}