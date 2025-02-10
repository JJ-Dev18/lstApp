import prisma from "../config/database";
import { Request, Response } from 'express'

export const inicializarPosiciones = async (req : Request, res : Response) => {
    try {
      const equipos = await prisma.equipo.findMany();
      const torneoId = parseInt(req.params.torneoId);
      const categoriaId = parseInt(req.params.categoriaId);
      const grupoId = req.params.grupoId ? parseInt(req.params.grupoId) : null;
      for (const equipo of equipos) {
      const posicionExistente = await prisma.posiciones.findFirst({
        where: {
          equipoId: equipo.id,
          torneoId: torneoId,
          categoriaId: categoriaId,
          grupoId: grupoId ?? undefined, // Use undefined if grupoId is null
        },
      });
      if (!posicionExistente) {
        await prisma.posiciones.create({
            data:  {
              equipoId: equipo.id,
              torneoId: torneoId,
              categoriaId: categoriaId,
              grupoId: grupoId
            }
        });
      }
    }
      res.status(200).json({message: 'Posiciones inicializadas.'});
    } catch (error) {
      res.status(500).json({ error: 'Error inicializando posiciones' });
    }
  }

export const actualizarPosiciones = async (req:Request, res : Response) => {
    const partidoId = parseInt(req.params.partidoId);
    // const torneoId = parseInt(req.params.torneoId);
    //  const categoriaId = parseInt(req.params.categoriaId);
  // const grupoId = req.params.grupoId ? parseInt(req.params.grupoId) : null;
    try {
      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
        include: {
          equipo1: {
            include: {
              grupos: {
                include: {
                  grupo: true,
                },
              },
            },
          },
          equipo2: {
            include: {
              grupos: {
                include: {
                  grupo: true,
                },
              },
            },
          },
        },
      });

      console.log(partido,"partido")

      if (!partido) {
        return res.status(404).json({ error: 'Partido no encontrado' });
      }
  
      const { equipo1Id, equipo2Id, marcadorEquipo1, marcadorEquipo2 } = partido;
      
      const equipo1GrupoId = partido.equipo1.grupos[0]?.grupoId;
    const equipo2GrupoId = partido.equipo2.grupos[0]?.grupoId;

    const whereConditionLocal: any = {
      equipoId_torneoId_categoriaId_grupoId: {
        equipoId: equipo1Id,
        torneoId: partido.torneoId,
        categoriaId: partido.categoriaId,
        grupoId: equipo1GrupoId,
      },
    };

    const whereConditionVisitante: any = {
      equipoId_torneoId_categoriaId_grupoId: {
        equipoId: equipo2Id,
        torneoId: partido.torneoId,
        categoriaId: partido.categoriaId,
        grupoId: equipo2GrupoId,
      },
    };
  
      // if (grupoId !== null) {
      //   whereConditionLocal.grupoId = grupoId;
      //   whereConditionVisitante.grupoId = grupoId;
      // }
      await prisma.$transaction(async (prisma) => {
        // Actualizar tabla de posiciones para equipo local
        await prisma.posiciones.update({
          where: whereConditionLocal,
          data: {
            partidosJugados: { increment: 1 },
            golesAFavor: { increment: marcadorEquipo1 },
            golesEnContra: { increment: marcadorEquipo2 },
            ...(marcadorEquipo1 > marcadorEquipo2 && {
              partidosGanados: { increment: 1 },
              puntos: { increment: 3 },
            }),
            ...(marcadorEquipo1 === marcadorEquipo2 && {
              partidosEmpatados: { increment: 1 },
              puntos: { increment: 1 },
            }),
            ...(marcadorEquipo1 < marcadorEquipo2 && {
              partidosPerdidos: { increment: 1 },
            }),
          },
        });
  
        // Actualizar tabla de posiciones para equipo visitante
        await prisma.posiciones.update({
          where: whereConditionVisitante,
          data: {
            partidosJugados: { increment: 1 },
            golesAFavor: { increment: marcadorEquipo2 },
            golesEnContra: { increment: marcadorEquipo1 },
            ...(marcadorEquipo2 > marcadorEquipo1 && {
              partidosGanados: { increment: 1 },
              puntos: { increment: 3 },
            }),
            ...(marcadorEquipo2 === marcadorEquipo1 && {
              partidosEmpatados: { increment: 1 },
              puntos: { increment: 1 },
            }),
            ...(marcadorEquipo2 < marcadorEquipo1 && {
              partidosPerdidos: { increment: 1 },
            }),
          },
        });
      });
  
      res.status(200).send('Posiciones actualizadas.');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error actualizando posiciones' });
    }
  }   

export const getTablaPosicionesGeneral = async (req : Request, res:Response) => {
    
    const torneoId = parseInt(req.params.torneoId);
    const categoriaId = parseInt(req.params.categoriaId);
    try {
      const posiciones = await prisma.posiciones.findMany({
        where: { torneoId: torneoId , categoriaId : categoriaId },
        include: {
          equipo: true,
        },
      });
     console.log(posiciones,"posiciones")
      const tablaDePosiciones = posiciones.map(posicion => ({
        equipo: posicion.equipo.nombre,
        partidosJugados: posicion.partidosJugados,
        partidosGanados: posicion.partidosGanados,
        partidosEmpatados: posicion.partidosEmpatados,
        partidosPerdidos: posicion.partidosPerdidos,
        golesAFavor: posicion.golesAFavor,
        golesEnContra: posicion.golesEnContra,
        puntos: posicion.puntos,
      }));
  
      // Ordenar la tabla de posiciones por puntos y otros criterios
      tablaDePosiciones.sort((a, b) => {
        if (a.puntos !== b.puntos) {
          return b.puntos - a.puntos; // Ordenar por puntos (descendente)
        }
        const diferenciaDeGolesA = a.golesAFavor - a.golesEnContra;
        const diferenciaDeGolesB = b.golesAFavor - b.golesEnContra;
        if (diferenciaDeGolesA !== diferenciaDeGolesB) {
          return diferenciaDeGolesB - diferenciaDeGolesA; // Ordenar por diferencia de goles (descendente)
        }
        return b.golesAFavor - a.golesAFavor; // Ordenar por goles a favor (descendente)
      });
      console.log(tablaDePosiciones,"Tabla de posiciones ")
      res.status(200).json(tablaDePosiciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obteniendo tabla de posiciones' });
    }
  }  

export const getTablaPosicionesGrupos =  async (req:Request, res:Response) => {
  const categoriaId = parseInt(req.params.categoriaId);
  const grupoId = parseInt(req.params.grupoId);
  const torneoId = parseInt(req.params.torneoId);
  
  try {
    const posiciones = await prisma.posiciones.findMany({
      where: {
        torneoId : torneoId,
        categoriaId: categoriaId,
        grupoId: grupoId
      },
      include: {
        equipo: true,
      },
    });

    const tablaDePosiciones = posiciones.map(posicion => ({
      equipo: posicion.equipo.nombre,
      partidosJugados: posicion.partidosJugados,
      partidosGanados: posicion.partidosGanados,
      partidosEmpatados: posicion.partidosEmpatados,
      partidosPerdidos: posicion.partidosPerdidos,
      golesAFavor: posicion.golesAFavor,
      golesEnContra: posicion.golesEnContra,
      puntos: posicion.puntos,
    }));

    // Ordenar la tabla de posiciones por puntos y otros criterios
    tablaDePosiciones.sort((a, b) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos; // Ordenar por puntos (descendente)
      }
      const diferenciaDeGolesA = a.golesAFavor - a.golesEnContra;
      const diferenciaDeGolesB = b.golesAFavor - b.golesEnContra;
      if (diferenciaDeGolesA !== diferenciaDeGolesB) {
        return diferenciaDeGolesB - diferenciaDeGolesA; // Ordenar por diferencia de goles (descendente)
      }
      return b.golesAFavor - a.golesAFavor; // Ordenar por goles a favor (descendente)
    });

    res.status(200).json(tablaDePosiciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo tabla de posiciones' });
  }
}  