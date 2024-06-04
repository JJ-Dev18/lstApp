import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getEquipos = async (req: Request, res: Response) => {
  try {
    const equipos = await prisma.equipo.findMany({
      where :{
        
      }
    })
    res.json(equipos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getEquipo = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const equipo = await prisma.equipo.findUnique({ where: { id: Number(id) } })
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo not found' })
    }
    res.json(equipo)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createEquipo = async (req: Request, res: Response) => {
  try {
    const { nombre, categoriaId } = req.body
    const newEquipo = await prisma.equipo.create({
      data: { nombre, categoriaId }
    })
    res.status(201).json(newEquipo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateEquipo = async (req: Request, res: Response) => {
  const { id } = req.params
  const { nombre, categoriaId } = req.body
  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: { nombre, categoriaId }
    })
    res.json(updatedEquipo)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteEquipo = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.equipo.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
