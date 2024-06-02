import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } })
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' })
    }
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol, googleId } = req.body
    const newUsuario = await prisma.usuario.create({
      data: { nombre, email, password, rol, googleId }
    })
    res.status(201).json(newUsuario)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const { nombre, email, password, rol, googleId } = req.body
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, email, password, rol, googleId }
    })
    res.json(updatedUsuario)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.usuario.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
