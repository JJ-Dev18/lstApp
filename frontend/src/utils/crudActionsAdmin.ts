
export const columnsAdminCrud = {
    usuarios: [
      { name: 'nombre', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'rol', type: 'string' }
    ],
    categorias: [
      { name: 'nombre', type: 'string' }
    ],
    equipos: [
      { name: 'nombre', type: 'string' },
      { name: 'categoriaId', type: 'number' }
    ],
    jugadores: [
      { name: 'nombre', type: 'string' },
      { name: 'equipoId', type: 'number' },
      { name: 'numero', type: 'number' },
      { name: 'posicion', type: 'string' },
      { name: 'fotoUrl', type: 'string' }
    ],
    partidos: [
      { name: 'equipo1Id', type: 'number' },
      { name: 'equipo2Id', type: 'number' },
      { name: 'fecha', type: 'string' },
      { name: 'duracion', type: 'number' },
      { name: 'categoriaId', type: 'number' },
      { name: 'marcadorEquipo1', type: 'number' },
      { name: 'marcadorEquipo2', type: 'number' },
      { name: 'estado', type: 'string' }
    ],
    eventos: [
      { name: 'partidoId', type: 'number' },
      { name: 'tipo', type: 'string' },
      { name: 'tiempo', type: 'string' },
      { name: 'jugadorId', type: 'number' },
      { name: 'planilleroId', type: 'number' },
      { name: 'comentario', type: 'string' }
    ],
    grupos: [
      { name: 'nombre', type: 'string' }
    ],
    estadisticas: [
      { name: 'jugadorId', type: 'number' },
      { name: 'partidoId', type: 'number' },
      { name: 'goles', type: 'number' },
      { name: 'bloqueos', type: 'number' },
      { name: 'intercepciones', type: 'number' },
      { name: 'asistencias', type: 'number' }
    ],
    torneos : [
      { name : 'nombre'  , type : 'string'},
      { name : "categorias"  , type : 'string'},
      { name : "partidos"  , type : 'string'},
      { name : "equipos"  , type : 'string'},
      { name : "jugadores"  , type : 'string'},
    ]
  }


  export const apiEndpoints = {
    usuarios: '/usuarios',
    categorias: '/categorias/torneo',
    equipos: '/equipos/torneo',
    jugadores: '/jugadores',
    partidos: '/partidos/Torneo',
    eventos: '/eventos',
    grupos: '/grupos',
    estadisticas: '/estadisticas',
    torneos : '/torneos'
  }