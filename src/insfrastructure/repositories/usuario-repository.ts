import { Usuario } from "../../domain/models/usuario";
import { getPoolConnection } from "./data-source";
import { FieldPacket, Pool, ResultSetHeader,RowDataPacket } from "mysql2";

export class UsuarioRepository { 
    async agregarUsuario (usuario: Usuario) {
        const connection = getPoolConnection();
        const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)`
        const values = [
            usuario.nombre,
            usuario.email,
            usuario.telefono,
        ];
        const result = await connection.query(querySql, values);
        return [0];

    } 

    async obtenarUsuarios() {
        const connection = getPoolConnection ();
        const querySql = `SELECT * FROM usuarios`;
        const result = await connection.query (querySql);
        return result[0];
    }

    async modificarUsuario( usuario: Usuario) {

    }
}