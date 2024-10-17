import { Usuario } from "../../domain/models/usuario";
import { getPoolConnection } from "./data-source";
import { FieldPacket, Pool, ResultSetHeader,RowDataPacket } from "mysql2";

export class UsuarioRepository { 
    async agregarUsuario (usuario: Usuario): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)`
        const values: Array<string|number> = [
            usuario.nombre,
            usuario.email,
            usuario.telefono,
        ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];

    } 

    async obtenerUsuarios() {
        const connection = getPoolConnection ();
        const querySql = `SELECT * FROM usuarios`;
        const result = await connection.query (querySql);
        return result[0];
    }

    async modificarUsuario( usuario: Usuario) {
        const connection = getPoolConnection();
        const querySql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ? where id = ? `;
        const values =  [
            usuario.nombre,
            usuario.email,
            usuario.telefono,
            usuario.id
        ];
        const result = await connection.query<ResultSetHeader>(querySql,values);
        return result [0];
    }

    async eliminarUsuario (idUsuario: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM usuarios WHERE id = ?`;
        const values = [idUsuario];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result [0];
    }
}