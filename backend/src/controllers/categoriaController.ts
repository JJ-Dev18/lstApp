import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const { torneoId } = req.params
    const categorias = await prisma.categoria.findMany({
       where : {
        torneoId : Number(torneoId)
       }
    })
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getGruposCategoria = async (req: Request, res: Response) => {
  const { categoriaId } = req.params;
  try {
    const grupos = await prisma.grupoClasificacion.findMany({
      where: { categoriaId: Number(categoriaId) },
      include: { equiposGrupos: { include: { equipo: true } } },
    });
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching groups' });
  }
}

export const getCategoria = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } })
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria not found' })
    }
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body
    const { torneoId } = req.params
    const newCategoria = await prisma.categoria.create({
      data: { nombre , torneoId : Number(torneoId) }
    })
    res.status(201).json(newCategoria)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params
  const { nombre } = req.body
  try {
    const updatedCategoria = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nombre }
    })
    res.json(updatedCategoria)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.categoria.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
