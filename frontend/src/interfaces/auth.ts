export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: Role;
  torneos: number;
}

export enum Role {
  PLANILLERO = "planillero",
  ADMIN = "administrador",
  ESPECTADOR = "espectador",
}

