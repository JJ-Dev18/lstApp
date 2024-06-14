
  export interface EquiposGrupo {
    equipoId: number;
    grupoId:  number;
    equipo:   GruposEquipo;
  }
  
  export interface GruposEquipo {
    id:             number;
    nombre:         string;
    categoriaId:    number;
    equiposGrupos?: EquiposGrupo[];
    torneoId?:      number;
  }