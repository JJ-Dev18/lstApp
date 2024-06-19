import prisma from "../config/database";

async function actualizarMarcador(partidoId:number, jugadorId:number, tipo:string,decrement?:boolean) {
    try {
         console.log(decrement,"asdfasd")
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
               ? { marcadorEquipo1: {  [!decrement ? 'increment' : 'decrement']:  1 } }  // Si el jugador pertenece al equipo 1, incrementar marcadorEquipo1
               : { marcadorEquipo2: {  [!decrement ? 'increment' : 'decrement']:  1 } }; // Si el jugador pertenece al equipo 2, incrementar marcadorEquipo2
          
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

   export { actualizarMarcador }