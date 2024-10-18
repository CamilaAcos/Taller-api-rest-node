import { QueryResult, ResultSetHeader } from "mysql2";
import { Usuario } from "../../domain/models/usuario";
import { UsuarioRepository } from "../repositories/usuario-repository";

export class UsuarioController {
  private repository: UsuarioRepository;

  constructor() {
    // Clase repository que tiene acceso a la base de datos
    this.repository = new UsuarioRepository();
  }

  
  async agregar(payload: {
    nombre: string;
    email: string;
    telefono: string;
    }) {
    try {
      const usuario = new Usuario({
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono,
      });
      const resultado = await this.repository.agregarUsuario(usuario);
      if (resultado.affectedRows == 1) {
        console.log(`usuario agregado con el id: ${resultado.insertId}`);
      } else {
        console.log("El usuario no se agrego");
      }
      return resultado;
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar el usuario.", error?.message);
      return error;
    }
  }

  async modificar(payload: {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
  }) {
    try {
      const usuario = new Usuario({
        id: payload.id,
        nombre: payload.nombre,
        email: payload.email,
        telefono: payload.telefono,
        
      });
      const resultado = await this.repository.modificarUsuario(usuario);
      if (resultado.affectedRows === 1) {
        console.log("usuario actualizado");
      } else {
        console.log("No se pudo actualizar el usuario");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error actualizando el usuario.");
      return error;
    }
  }

  async obtener() {
    try {
      const resultado = await this.repository.obtenerUsuarios();
      console.log("Usuarios obtenidos");
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando los usuarios.");
      return error;
    }
  }

  async eliminar(id: number) {
    const resultado: ResultSetHeader = await this.repository.eliminarUsuario(id);
    if (resultado.affectedRows == 1) {
      return { ok: true, message: "usuario eliminado" };
    } else {
      return { ok: false, message: "No se pudo eliminar el usuario" };
    }
  }

}
