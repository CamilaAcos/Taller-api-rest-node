import { QueryResult, ResultSetHeader, FieldPacket } from "mysql2";
import { Vehiculo } from "../../domain/models/vehiculo";
import { VehiculoRepository } from "../repositories/vehiculos-repository";
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
    fecha: Date;
    }) {
    try {
      const reserva = new Reserva({
        usuario_id: payload.usuario_id,
        vehiculo_id: payload.vehiculo_id,
        fecha: payload.fecha,
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
    fecha: Date;
  }) {
    try {
      const reserva = new Reserva({
        id: payload.id,
        usuario_id: payload.usuario_id,
        vehiculo_id: payload.vehiculo_id,
        fecha: payload.fecha,
        
      });
      const result = await this.repository.modificarReserva(reserva);
      if (result.affectedRows === 1) {
        console.log("Vehiculo actualizado");
      } else {
      
        console.log("No se pudo actualizar el Vehiculo");
      }
      return result;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando el Vehiculo.");
      return error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerVehiculos();
      console.log("Vehiculos obtenidos");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando los Vehiculos.");
      return error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarVehiculo(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "vehiculo eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el vehiculo" };
    }
  }
}
