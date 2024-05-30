
export interface User {
    nombre : string,
    email:string ,
    rol : Role 
}

export enum Role {
    PLANILLERO = 'planillero',
    ADMIN = 'administrador',
    ESPECTADOR= 'espectador'
}