import { Request, Response } from 'express'
import { Jugador, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getJugadores = async (req: Request, res: Response) => {
  try {
    const { equipoId } = req.params
    const jugadores = await prisma.jugador.findMany({
      where  : {
        equipoId : Number(equipoId)
      }
    })
    res.json(jugadores)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getJugador = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const jugador = await prisma.jugador.findUnique({ where: { id: Number(id) } })
    if (!jugador) {
      return res.status(404).json({ error: 'Jugador not found' })
    }
    res.json(jugador)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createJugador = async (req: Request, res: Response) => {
  try {
    const arrayJugadores = req.body
    arrayJugadores.forEach( async (jugador : Jugador )=> {
         if(jugador.id){
            await prisma.jugador.update({
              data : {...jugador,numero : Number(jugador.numero)},
              where: { id : jugador.id}
            })
         }
         else {
           await prisma.jugador.create({
            data : {...jugador,numero : Number(jugador.numero)}
           })
         }
    });
    // const jugadores = await  prisma.jugador.createMany({
    //   data : arrayJugadores,
      
    // })
 
    // const newJugador = await prisma.jugador.create({
    //   data: { nombre, equipoId, numero, posicion, fotoUrl }
    // })
    res.status(201).json({ message : 'jugadores agregados'})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateJugador = async (req: Request, res: Response) => {
  const { id } = req.params
  const { nombre, equipoId, numero, posicion, fotoUrl } = req.body
  try {
    const updatedJugador = await prisma.jugador.update({
      where: { id: Number(id) },
      data: { nombre, equipoId, numero, posicion, fotoUrl }
    })
    res.json(updatedJugador)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteJugador = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.jugador.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
