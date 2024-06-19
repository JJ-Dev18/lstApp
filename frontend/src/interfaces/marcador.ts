export interface EventType {
    id: number;
    tipo: string;
    tiempo: string;
    jugadorId: number;
    partidoId: number;
    comentario?: string;
    planilleroId: number;
  }

export interface PartidoType {
    id:              number;
    equipo1Id:       number;
    equipo2Id:       number;
    fecha:           Date;
    duracion:        number;
    categoriaId:     number;
    marcadorEquipo1: number;
    marcadorEquipo2: number;
    estado:          string;
    equipo1:         Equipo;
    equipo2:         Equipo;
    categoria:       Categoria;
    eventos:         any[];
}

export interface Categoria {
    id:     number;
    nombre: string;
}

export interface Equipo {
    id:          number;
    nombre:      string;
    categoriaId: number;
    logo : string ;
}

export interface EventoType {
    id?:           number;
    partidoId:    number;
    tipo:         string;
    tiempo:       string;
    jugadorId:    number;
    planilleroId?: number;
    comentario?:   string;
    jugador?:      Jugador;
}

export interface Jugador {
    id:       number;
    nombre:   string;
    equipoId: number;
    numero:   number;
    posicion: string;
    fotoUrl:  string;
    equipo:   Equipo;
}

export interface Equipo {
    id:          number;
    nombre:      string;
    categoriaId: number;
}
