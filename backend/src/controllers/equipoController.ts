import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getEquipos = async (req: Request, res: Response) => {
  const { torneoId } = req.params 
  try {

    const equipos = await prisma.equipo.findMany({
      where: {
        torneoId: Number(torneoId),
      },
    })

    // Luego contamos los jugadores para cada equipo de manera asincrónica
    const equiposConConteo = await Promise.all(equipos.map(async (equipo) => {
      const cantidadJugadores = await prisma.jugador.count({
        where: {
          equipoId: equipo.id,
        },
      })
      return {
        ...equipo,
        jugadores : cantidadJugadores,
      }
    }))

    // Devolvemos la lista de equipos con el conteo de jugadores en la respuesta HTTP
    res.status(200).json(equiposConConteo)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getEquiposPorCategoria = async (req: Request, res: Response) => {
  const { categoriaId } = req.params
  try {
    const equipos = await prisma.equipo.findMany({ where: { categoriaId: Number(categoriaId) } })
   
    res.json(equipos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getEquiposPorGrupo= async (req: Request, res: Response) => {
  const { grupoId } = req.params;
  try {
    const equiposGrupos = await prisma.equiposGrupos.findMany({
      where: { grupoId: Number(grupoId) },
      include: { equipo: true },
    });
    const equipos = equiposGrupos.map((eg) => eg.equipo);
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teams for group' });
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
    const { nombre, categoriaId} = req.body
    const { torneoId } = req.params
    
    const newEquipo = await prisma.equipo.create({
      data: { nombre, categoriaId : Number(categoriaId) , torneoId : Number(torneoId)}
    })
    console.log(newEquipo,"newequipo")
    res.status(201).json(newEquipo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateEquipo = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(req.params)
  const { nombre, categoriaId } = req.body
  console.log(req.body
  )
  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: { nombre, categoriaId: Number(categoriaId)}
    })
    console.log(updatedEquipo,"updated")
    res.status(200).json(updatedEquipo)
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
