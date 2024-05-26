import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Eliminar todas las tablas existentes
//   await knex('eventos').del();
//   await knex('jugadores').del();
//   await knex('equipos').del();
//   await knex('categorias').del();
//   await knex('usuarios').del();

  // Crear categorías
  const categorias = [
    { nombre: 'Mixta' },
    { nombre: 'Femenina' },
    { nombre: 'Masculina' },
  ];

  const categoriaIds = await knex('categorias').insert(categorias).returning('id');

  const [mixtaId, femeninaId, masculinaId] = categoriaIds.map(categoria => categoria.id);

  // Crear equipos
  const equipos = [
    { nombre: 'Oru', categoriaId: masculinaId },
    { nombre: 'Orulous', categoriaId: masculinaId },
    { nombre: 'Castella', categoriaId: masculinaId },
    { nombre: 'Perico', categoriaId: masculinaId },

  ];

  const equipoIds = await knex('equipos').insert(equipos).returning('id');
  const [equipo1Id, equipo2Id,equipo3Id,equipo4Id] = equipoIds.map(equipo => equipo.id);

  // Crear jugadores para equipo 1
  const jugadoresEquipo1 = [
    { nombre: 'Murillo 1', equipoId: equipo1Id },
    { nombre: 'Jugador 2', equipoId: equipo1Id },
    { nombre: 'Jugador 3', equipoId: equipo1Id },
    { nombre: 'Jugador 4', equipoId: equipo1Id },
    { nombre: 'Jugador 5', equipoId: equipo3Id },
    { nombre: 'Jugador 6', equipoId: equipo3Id },
    { nombre: 'Jugador 7', equipoId: equipo3Id },
  ];

  await knex('jugadores').insert(jugadoresEquipo1);

  // Crear jugadores para equipo 2
  const jugadoresEquipo2 = [
    { nombre: 'Jugador 1', equipoId: equipo2Id },
    { nombre: 'Jugador 2', equipoId: equipo2Id },
    { nombre: 'Jugador 3', equipoId: equipo2Id },
    { nombre: 'Jugador 4', equipoId: equipo2Id },
    { nombre: 'Jugador 5', equipoId: equipo4Id },
    { nombre: 'Jugador 6', equipoId: equipo4Id },
    { nombre: 'Jugador 7', equipoId: equipo4Id },
  ];

  await knex('jugadores').insert(jugadoresEquipo2);

  // Crear un planillero
  const hashedPassword = await bcrypt.hash('planillero123', 10);
  const planillero = {
    nombre: 'Planillero 1',
    email: 'planillero1@example.com',
    password: hashedPassword,
    rol: 'planillero',
  };

  await knex('usuarios').insert(planillero);
  const partidos = [
    { equipo1Id, equipo2Id, fecha: new Date(), duracion: 120 },
    { equipo1Id, equipo2Id, fecha: new Date(Date.now() + 86400000), duracion: 120 }, // Partido al día siguiente
  ];

  await knex('partidos').insert(partidos);
}
