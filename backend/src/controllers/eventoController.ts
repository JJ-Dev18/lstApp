import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.evento.findMany()
    res.json(eventos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getEvento = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const evento = await prisma.evento.findUnique({ where: { id: Number(id) } })
    if (!evento) {
      return res.status(404).json({ error: 'Evento not found' })
    }
    res.json(evento)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createEvento = async (req: Request, res: Response) => {
  try {
    const { partidoId, tipo, tiempo, jugadorId, planilleroId, comentario } = req.body
    const newEvento = await prisma.evento.create({
      data: { partidoId, tipo, tiempo, jugadorId, planilleroId, comentario }
    })
    res.status(201).json(newEvento)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateEvento = async (req: Request, res: Response) => {
  const { id } = req.params
  const { partidoId, tipo, tiempo, jugadorId, planilleroId, comentario } = req.body
  try {
    const updatedEvento = await prisma.evento.update({
      where: { id: Number(id) },
      data: { partidoId, tipo, tiempo, jugadorId, planilleroId, comentario }
    })
    res.json(updatedEvento)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteEvento = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.evento.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
