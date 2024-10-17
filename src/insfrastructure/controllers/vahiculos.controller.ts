import { QueryResult, ResultSetHeader } from "mysql2";
import { Vehiculo } from "../../domain/models/vehiculo";
import { VehiculoRepository } from "../repositories/vehiculos-repository";

export class VehiculoController {
  private repository: VehiculoRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new VehiculoRepository();
  }

  
  async agregar(payload: {
    marca: string;
    modelo: string;
    year: number;
    }) {
    try {
      const vehiculo = new Vehiculo({
        marca: payload.marca,
        modelo: payload.modelo,
        year: payload.year,
      });
      const resultado = await this.repository.agregarVehiculo(vehiculo);
      if (resultado.affectedRows == 1) {
        console.log(`Vehiculo agregado con el id: ${resultado.insertId}`);
      } else {
        console.log("El Vehiculo no se agrego");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar el Vehiculo.", error?.message);
      return error;
    }
  }

  async modificar(payload: {
    id: number;
    marca: string;
    modelo: string;
    year: number;
  }) {
    try {
      const vehiculo = new Vehiculo({
        id: payload.id,
        marca: payload.marca,
        modelo: payload.modelo,
        year: payload.year,
        
      });
      const resultado = await this.repository.modificarVehiculo(vehiculo);
      if (resultado.affectedRows === 1) {
        console.log("Vehiculo actualizado");
      } else {
        console.log("No se pudo actualizar el Vehiculo");
      }
      return resultado;
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
