export interface Partido {
    id:              number;
    equipo1Id:       number;
    equipo2Id:       number;
    fecha:           string;
    duracion:        number;
    categoriaId:     number;
    marcadorEquipo1: number;
    marcadorEquipo2: number;
    estado:          string;
    torneoId:        number;
    planilleroId:    number;
    equipo1:         Categoria;
    equipo2:         Categoria;
    categoria:       Categoria;
    eventos:         any[];
    planillero:      Planillero;
}

export interface Categoria {
    id:           number;
    nombre:       string;
    torneoId:     number;
    categoriaId?: number;
}

export interface Planillero {
    id:        number;
    usuarioId: number;
    torneoId:  number;
    usuario:   Usuario;
}

export interface Usuario {
    nombre: string;
}

export enum estadoPartido {
    SINJUGAR = "SIN_JUGAR",
    ENCURSO = "EN_CURSO",
    JUGADO = "JUGADO",
    SUSPENDIDO = "SUSPENDIDO",
  }