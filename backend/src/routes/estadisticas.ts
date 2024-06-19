import prisma from "../config/database";
import express from 'express';


const router = express.Router();
router.get('/', async (req,res) => {
  const estadisticas = await prisma.estadistica.findMany()
  res.status(200).json(estadisticas)
})

router.get('/jugador/:jugadorId', async (req,res) => {
    try {
        const { jugadorId } = req.params; // Extraer jugadorId de los parámetros de la solicitud
        const estadisticas = await obtenerEstadisticasJugador(parseInt(jugadorId, 10)); // Convertir jugadorId a número
        res.status(200).json(estadisticas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las estadísticas del jugador' });
      }
  })

  router.get('/equipo/:equipoId', async (req,res) => {
    try {
        const { equipoId } = req.params; // Extraer jugadorId de los parámetros de la solicitud
        const estadisticas = await obtenerEstadisticasEquipo(parseInt(equipoId, 10)); // Convertir jugadorId a número
        res.status(200).json(estadisticas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las estadísticas del jugador' });
      }
  })  


 const actualizarEstadisticas = async (tipo:string,jugadorId:number,partidoId:number,decrement?: boolean) => {
  console.log(decrement,"decrement")  
  const campoActualizar = {
        goles: 0,
        bloqueos: 0,
        intercepciones: 0,
        asistencias: 0
      };
    
      switch (tipo) {
        case 'gol':
          campoActualizar.goles = 1;
          break;
        case 'bloqueo':
          campoActualizar.bloqueos = 1;
          break;
        case 'asistencia':
          campoActualizar.asistencias = 1;
          break;
        case 'intercepcion':
          campoActualizar.intercepciones = 1;
          break;
        default:
          throw new Error(`Tipo de evento desconocido: ${tipo}`);
      }
    
      // Actualizar la estadística del jugador para el partido
      try {
          const estadisticaExistente = await prisma.estadistica.findFirst({
            where: {
              jugadorId: jugadorId,
              partidoId: partidoId,
            },
          });
        
          if (estadisticaExistente) {
            // Actualizar la estadística existente
           

            await prisma.estadistica.update({
              where: {
                id: estadisticaExistente.id,
              },
              data: {
                goles: {
                  [!decrement ? 'increment' : 'decrement']: campoActualizar.goles,
                },
                bloqueos: {
                  [!decrement ? 'increment' : 'decrement']: campoActualizar.bloqueos,
                },
                intercepciones: {
                  [!decrement ? 'increment' : 'decrement']: campoActualizar.intercepciones,
                },
                asistencias: {
                  [!decrement ? 'increment' : 'decrement']: campoActualizar.asistencias,
                },
              },
            });
          } else {
            // Crear una nueva estadística
            await prisma.estadistica.create({
              data: {
                jugadorId: jugadorId,
                partidoId: partidoId,
                goles: campoActualizar.goles,
                bloqueos: campoActualizar.bloqueos,
                intercepciones: campoActualizar.intercepciones,
                asistencias: campoActualizar.asistencias,
              },
            });
          }
        
      } catch (error) {
        console.log(error)
      }

}

async function obtenerEstadisticasJugador(jugadorId: number) {
    try {
        
        const estadisticas = await prisma.estadistica.aggregate({
          _sum: {
            goles: true,
            bloqueos: true,
            asistencias: true,
            intercepciones: true,
          },
          where: {
            jugadorId: jugadorId,
          },
        });
        return estadisticas._sum;
    } catch (error) {
        console.log(error)
    }
  
  }

async function obtenerEstadisticasEquipo(equipoId: number) {
    try {
        
        const estadisticas = await prisma.estadistica.aggregate({
          _sum: {
            goles: true,
            bloqueos: true,
            asistencias: true,
            intercepciones: true,
          },
          where: {
            jugador: {
              equipoId: equipoId,
            },
          },
        });
      
        return estadisticas._sum;
    } catch (error) {
        console.log(error)
    }
  }
  export { router as estadisticasRoutes ,obtenerEstadisticasEquipo , obtenerEstadisticasJugador , actualizarEstadisticas};