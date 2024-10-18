import { QueryResult, ResultSetHeader, FieldPacket } from "mysql2";
import { ReservaRepository } from "../repositories/reservas-repository";
import { Reserva } from "../../domain/models/reserva";

export class ReservaController {
  private repository: ReservaRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new ReservaRepository();
  }

  
  async agregar(payload: {
    usuario_id: number;
    vehiculo_id: number;
    fecha_reserva: Date;
    }) {
    try {
      const reserva = new Reserva({
        usuario_id: payload.usuario_id,
        vehiculo_id: payload.vehiculo_id,
        fecha_reserva: payload.fecha_reserva,
      });
      const resultado = await this.repository.agregarReserva(reserva);
      if (resultado.affectedRows == 1) {
        console.log(`Reserva agregada con el id: ${resultado.insertId}`);
      } else {
        console.log("La reserva no se agregó");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar la Reserva", error?.message);
      return error;
    }
  }

  async modificar(payload: {
    id: number;
    usuario_id: number;
    vehiculo_id: number;
    fecha_reserva: Date;
  }) {
    try {
      const reserva = new Reserva({
        id: payload.id,
        usuario_id: payload.usuario_id,
        vehiculo_id: payload.vehiculo_id,
        fecha_reserva: payload.fecha_reserva,
        
      });
      const result = await this.repository.modificarReserva(reserva);
      if (result && result.affectedRows === 1) {
        console.log("Reserva actualizada");
      } else {
        console.log("No se pudo actualizar la reserva");
      }
      return result;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando la reserva");
      return error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerReservas();
      console.log("Vehiculos obtenidos");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando las reservas");
      return error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarReserva(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "Reserva eliminada" };
    } else {
      return { ok: false, message: "No se pudo eliminar la reserva" };
    }
  }
}
