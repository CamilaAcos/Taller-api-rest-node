export class Reserva {
    id?: number
    usuario_id: number
    vehiculo_id: number
    fecha: Date

    constructor(infoReserva: {
        id?: number
        usuario_id: number
        vehiculo_id: number
        fecha: Date
    }) {
        this.id =infoReserva.id;
        this.usuario_id = infoReserva.usuario_id;
        this.vehiculo_id = infoReserva.vehiculo_id;
        this.fecha = infoReserva.fecha;

    }

}