export class Reserva {

    usuario_id: number
    vehiculo_id: number
    fecha: Date

    constructor(infoReserva: {

        usuario_id: number
        vehiculo_id: number
        fecha: Date
    }) {
        this.usuario_id = infoReserva.usuario_id;
        this.vehiculo_id = infoReserva.vehiculo_id;
        this.fecha = infoReserva.fecha;

    }

}