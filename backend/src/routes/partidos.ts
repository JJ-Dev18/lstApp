import express from 'express';
import prisma from '../config/database';
import { ensureAuthenticated } from '../middlewares/auth';


const router = express.Router();

router.get('/', ensureAuthenticated, async  (req,res) => {
    const partidos = await prisma.partido.findMany({
        include: {
         equipo1 : true ,
         equipo2 : true ,
         categoria: true ,
         eventos: true,
        },
      })
    res.json(partidos)
});
router.get('/:partidoId', async  (req,res) => {
    const { partidoId  }= req.params
    const partido = await prisma.partido.findFirst({
        where:{
         id : Number(partidoId)
        },
        include: {
         equipo1 : true ,
         equipo2 : true ,
         categoria: true ,
         eventos: {
            include:{
                jugador : {
                    include :{
                        equipo: true
                    }
                }
                
            }
         },
        },
      })
    res.json(partido)
});


router.post( '/' , async (req,res) => {
  try {
      const { ...data } = req.body
      const equipo = await prisma.partido.create({
          data : data 
      })
      res.status(200).json(equipo)
  } catch (error) {
      res.status(500).json({error : error})
  }

})

async function actualizarMarcador(partidoId:number, jugadorId:number, tipo:string) {
   try {
        console.log(tipo,"asdfasd")
        if (tipo == "gol") {
            // Buscar el partido por su ID
            const partido = await prisma.partido.findUnique({
              where: { id: partidoId },
            });
            console.log(partido)
            if (!partido) {
              throw new Error('Partido no encontrado');
            }
        
            // Buscar el jugador y obtener su equipo
            const jugador = await prisma.jugador.findUnique({
              where: { id: jugadorId },
            });
            console.log(jugador)
            if (!jugador) {
              throw new Error('Jugador no encontrado');
            }
        
            // Determinar qué marcador actualizar basado en el equipo del jugador
            const campoActualizar = partido.equipo1Id === jugador.equipoId
              ? { marcadorEquipo1: { increment: 1 } }  // Si el jugador pertenece al equipo 1, incrementar marcadorEquipo1
              : { marcadorEquipo2: { increment: 1 } }; // Si el jugador pertenece al equipo 2, incrementar marcadorEquipo2
         
            // Actualizar el marcador del partido en la base de datos
            await prisma.partido.update({
              where: { id: partidoId },
              data: campoActualizar,
            });
        
            console.log('Marcador actualizado:', campoActualizar);
        } 
    } catch (error:any) {
         throw new Error('Error al cambiar de marcador');
    }
    
  }
router.put('/marcador' ,async (req,res)=> { 
    const { partidoId , marcadorEquipo1 , marcadorEquipo2 } = req.body 
    const partidoActualizado = await prisma.partido.update({
        where: { id: partidoId },
        data: {
          marcadorEquipo1: marcadorEquipo1,
          marcadorEquipo2: marcadorEquipo2,
        },
    })
})


export { router as RouterPartidos , actualizarMarcador};
