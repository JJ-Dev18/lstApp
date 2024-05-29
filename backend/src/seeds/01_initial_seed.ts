import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Eliminar todas las tablas existentes
  // await knex('eventos').del();
  // await knex('jugadores').del();
  // await knex('equipos').del();
  // await knex('categorias').del();
  // await knex('usuarios').del();
  // await knex('partidos').del();


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
    { nombre: 'Murillo 1', equipoId: equipo1Id , numero : 12 , posicion : 'cortador', fotoUrl: 'sdf' },
    { nombre: 'Carlos', equipoId: equipo1Id ,numero : 13 , posicion : 'Manejador', fotoUrl: 'sdf'},
    { nombre: 'Daniel', equipoId: equipo1Id ,numero : 14 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Felipe', equipoId: equipo1Id ,numero : 15 , posicion : 'Manejador', fotoUrl: 'sdf'},
    { nombre: 'Cristian', equipoId: equipo3Id ,numero : 32 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Juan', equipoId: equipo3Id ,numero : 33 , posicion : 'Manejador', fotoUrl: 'sdf'},
    { nombre: 'Jose', equipoId: equipo3Id ,numero : 34, posicion : 'cortador', fotoUrl: 'sdf'},
  ];

  await knex('jugadores').insert(jugadoresEquipo1);

  // Crear jugadores para equipo 2
  const jugadoresEquipo2 = [
    { nombre: 'Javier', equipoId: equipo2Id , numero : 12 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Julian', equipoId: equipo2Id , numero : 13 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Santiago O', equipoId: equipo2Id , numero : 14 , posicion : 'Manejador', fotoUrl: 'sdf'},
    { nombre: 'Yolman', equipoId: equipo2Id , numero : 15 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Jasinto', equipoId: equipo4Id , numero : 16 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Jerico', equipoId: equipo4Id , numero : 17 , posicion : 'cortador', fotoUrl: 'sdf'},
    { nombre: 'Fabricio', equipoId: equipo4Id, numero : 19, posicion : 'cortador', fotoUrl: 'sdf' },
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
    { equipo1Id, equipo2Id, fecha: new Date(), duracion: 120 , estado : 'SIN_JUGAR',categoriaId: 1 , marcadorEquipo1: 0 ,marcadorEquipo2:0},
    { equipo1Id, equipo2Id, fecha: new Date(Date.now() + 86400000), duracion: 120,estado : 'SIN_JUGAR',categoriaId : 1 , marcadorEquipo1: 0 ,marcadorEquipo2:0  }, // Partido al día siguiente
  ];

  await knex('partidos').insert(partidos);
}
