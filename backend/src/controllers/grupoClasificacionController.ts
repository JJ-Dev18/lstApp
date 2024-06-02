import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getGruposClasificacion = async (req: Request, res: Response) => {
  try {
    const grupos = await prisma.grupoClasificacion.findMany()
    res.json(grupos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getGrupoClasificacion = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const grupo = await prisma.grupoClasificacion.findUnique({ where: { id: Number(id) } })
    if (!grupo) {
      return res.status(404).json({ error: 'GrupoClasificacion not found' })
    }
    res.json(grupo)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createGrupoClasificacion = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body
    const newGrupoClasificacion = await prisma.grupoClasificacion.create({
      data: { nombre }
    })
    res.status(201).json(newGrupoClasificacion)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateGrupoClasificacion = async (req: Request, res: Response) => {
  const { id } = req.params
  const { nombre } = req.body
  try {
    const updatedGrupoClasificacion = await prisma.grupoClasificacion.update({
      where: { id: Number(id) },
      data: { nombre }
    })
    res.json(updatedGrupoClasificacion)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteGrupoClasificacion = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.grupoClasificacion.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
