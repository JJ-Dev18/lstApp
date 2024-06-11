import { Request, Response } from "express";
import prisma from "../config/database";


export const getEquiposDisponibles = async (req :Request, res:Response) => {
  const { categoriaId } = req.params;
  try {
    // Obtener todos los equipos de la categoría
    const todosLosEquipos = await prisma.equipo.findMany({
      where: {
        categoriaId: Number(categoriaId)
      }
    });

    // Obtener todos los equipos asociados a grupos de la categoría
    const equiposAsociados = await prisma.equiposGrupos.findMany({
      where: {
        grupo: {
          categoriaId: Number(categoriaId)
        }
      },
      select: {
        equipoId: true
      }
    });

    // Crear un conjunto de IDs de equipos asociados para filtrar
    const equiposAsociadosSet = new Set(equiposAsociados.map(e => e.equipoId));

    // Filtrar los equipos no asociados
    const equiposDisponibles = todosLosEquipos.filter(equipo => !equiposAsociadosSet.has(equipo.id));

    res.json(equiposDisponibles);
  } catch (error) {
    console.error('Error fetching available teams:', error);
    res.status(500).json({ error: 'Error fetching available teams' });
  }
}

export const getEquiposGrupo = async ( req: Request,res: Response) => {
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

export const addEquipoGroup = async (req :Request,res : Response) => {
    const { nombre, grupoId } = req.body;
    const { equipoId } = req.params
  try {
   

    // Luego, asociamos el equipo al grupo
    const equiposGrupos = await prisma.equiposGrupos.create({
      data: {
        equipoId : Number(equipoId),
        grupoId: Number(grupoId),
      },
    });

    res.json(equiposGrupos);
  } catch (error) {
    res.status(500).json({ error: 'Error adding team to group' });
  }
}