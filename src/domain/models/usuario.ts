export class Usuario {
    id?: number
    nombre: string
    email: string
    telefono: string

    constructor(infoUsuario: {
        id?: number,
        nombre: string,
        email: string,
        telefono: string,
    }){

        this.id = infoUsuario.id;
        this.nombre = infoUsuario.nombre;
        this.email = infoUsuario.email;
        this.telefono = infoUsuario.telefono;

    }
}