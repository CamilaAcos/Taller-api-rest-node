import { Reserva } from "../../domain/models/reserva";
import { getPoolConnection } from "./data-base";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2";

export class ReservaRepository { 
    async agregarReserva (reserva: Reserva) : Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `INSERT INTO reservas (usuario_id, vehiculo_id, fecha_reserva) VALUES (?, ?, ?)`
        const values = [
            reserva.usuario_id,
            reserva.vehiculo_id,
            reserva.fecha_reserva,
        ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result [0];

    } 

    async obtenerReservas() {
        const connection = getPoolConnection ();
        const querySql = `SELECT * FROM reservas`;
        const result = await connection.query (querySql);
        return result[0];
    }

    async modificarReserva( reserva: Reserva) {
        const connection = getPoolConnection();
        const queryUsuarioId = `SELECT id FROM usuarios WHERE id  = ?`
        if( queryUsuarioId) {
            const querySql = `UPDATE reservas SET usuario_id = ?, vehiculo_id = ?, fecha_reserva = ? WHERE id = ? `;
            const values=  [
                reserva.usuario_id,
                reserva.vehiculo_id,
                reserva.fecha_reserva,
                reserva.id,
            ];
            const result:  [ResultSetHeader, FieldPacket[]] = await connection.query(querySql,values);
        return result [0];

        }else{
            console.log("Usuario_id no existe")
            return null
        }
    }

    async eliminarReserva (idReserva: number) {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM Reservas WHERE id = ?`;
        const values = [idReserva];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result [0];
    }
   
}