import { Request, Response } from 'express'
import prisma from '../config/database'



export const getGruposClasificacion = async (req: Request, res: Response) => {
  try {
    const grupos = await prisma.grupoClasificacion.findMany()
    res.json(grupos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const getGruposPorCategoria = async (req: Request, res: Response) => {
  try {
    const { categoriaId }  = req.params
    const grupos = await prisma.grupoClasificacion.findMany({
      where : {
        categoriaId : Number(categoriaId)
      }
    })
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
    const { categoriaId} = req.params
    const newGrupoClasificacion = await prisma.grupoClasificacion.create({
     data : {
       nombre,
       categoriaId : Number(categoriaId)
     }
    })
    res.status(201).json(newGrupoClasificacion)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error sss' })
  }
}

export const asociarEquipoGrupo = async ( req :Request, res : Response) => {
  try {
    const { equipoId, grupoId } = req.body;
    const equiposGrupos = await prisma.equiposGrupos.create({
      data: {
        equipoId: Number(equipoId),
        grupoId: Number(grupoId),
      },
    });
    res.status(200).json(equiposGrupos);
  } catch (error) {
    console.log(error,"error asociarequipo")
    res.status(500).json({ error: `Error adding team to group ${error}` });
  }
}
export const eliminarAsociacionEquipo = async (req :Request, res :Response) => {
  const { equipoId, grupoId } = req.params;
  try {
    await prisma.equiposGrupos.delete({
      where: {
        equipoId_grupoId: {
          equipoId: Number(equipoId),
          grupoId: Number(grupoId),
        },
      },
    });
    res.json({ message: 'Equipo eliminado del grupo correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando equipo del grupo' });
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
