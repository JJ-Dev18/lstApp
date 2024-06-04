// src/routes/tournaments.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { Console, count } from 'console';

const prisma = new PrismaClient();
const router = Router();
 
router.get('/:usuarioId' , async ( req , res ) => {
  const { usuarioId } = req.params
  try {
    const torneos = await prisma.torneo.findMany({
      where : {
         usuarioId: Number(usuarioId)
      },
      include: {
        categorias: {
          select: {
            _count: true
          }
        },
        partidos: {
          select: {
            _count: true
          }
        },
        equipos: {
          select: {
            _count: true,
            jugadores: {
              select: {
                _count: true
              }
            }
          }
        },
      },
    });
    const torneosConConteo = torneos.map((torneo) => ({
      id: torneo.id,
      nombre: torneo.nombre,
      categorias: torneo.categorias.length,
      partidos: torneo.partidos.length,
      equipos : torneo.equipos.length,
      jugadores: torneo.equipos.reduce((acc, equipo) => acc + equipo.jugadores.length, 0),
      createdAt: torneo.createdAt,
      updatedAt: torneo.updatedAt,
    }));

    res.status(200).json(torneosConConteo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el torneo' });
  }
})

router.post('/:usuarioId', async (req, res) => {
  const { nombre, numEquipos, numJugadores, numCategorias } = req.body;
  const { usuarioId } = req.params

  try {
    // Crear torneo
    const torneo = await prisma.torneo.create({
      data: {
        nombre,
        usuario: {
          connect: { id: Number(usuarioId) },
        },
      },
    });

    // Crear categorías y obtener su ID
    const categorias = [];
    for (let i = 0; i < numCategorias; i++) {
      const categoria = await prisma.categoria.create({
        data: {
          nombre: `Categoría ${i + 1}`,
          torneo: {
            connect: { id: torneo.id },
          },
        },
      });
      categorias.push(categoria);
    }

    // Crear equipos y jugadores
    for (let i = 0; i < numEquipos; i++) {
      const equipo = await prisma.equipo.create({
        data: {
          nombre: `Equipo ${i + 1}`,
          categoria: {
            connect: { id: categorias[i % numCategorias].id },
          },
          torneo: {
            connect: { id: torneo.id },
          },
        },
      });

      for (let j = 0; j < numJugadores; j++) {
        await prisma.jugador.create({
          data: {
            nombre: `Jugador ${j + 1}`,
            equipo: {
              connect: { id: equipo.id },
            },
            numero: j + 1,
            posicion: 'Posición',
            fotoUrl: 'https://via.placeholder.com/150',
          },
        });
      }
    }

    res.status(200).json({ message: 'Torneo creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el torneo' });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const torneoEliminado = await prisma.torneo.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(torneoEliminado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el torneo' });
  }
});
export default router;
