import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getJugadores = async (req: Request, res: Response) => {
  try {
    const jugadores = await prisma.jugador.findMany()
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
    const { nombre, equipoId, numero, posicion, fotoUrl } = req.body
    const newJugador = await prisma.jugador.create({
      data: { nombre, equipoId, numero, posicion, fotoUrl }
    })
    res.status(201).json(newJugador)
  } catch (error) {
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
