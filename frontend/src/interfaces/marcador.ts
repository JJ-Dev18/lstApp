export interface EventType {
    id: number;
    tipo: string;
    tiempo: string;
    jugadorId: number;
    partidoId: number;
    comentario?: string;
    planilleroId: number;
  }

export interface PartidosType {
    partidos: PartidoType[];
}

export interface PartidoType {
    id:        number;
    equipo1Id: number;
    equipo2Id: number;
    fecha:     Date;
    duracion:  number;
}
