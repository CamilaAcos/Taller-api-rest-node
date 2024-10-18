import { Vehiculo } from "../../domain/models/vehiculo";
import { getPoolConnection } from "./data-base";
import { FieldPacket, Pool, ResultSetHeader,RowDataPacket } from "mysql2";

export class VehiculoRepository { 
    async agregarVehiculo (vehiculo: Vehiculo): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `INSERT INTO vehiculos (marca, modelo, year) VALUES (?, ?, ?)`
        const values: Array< string| number> = [
            vehiculo.marca,
            vehiculo.modelo,
            vehiculo.year
        ];
        const result:  [ResultSetHeader, FieldPacket[]]= await connection.query(querySql, values);
        return result [0];

    } 

    async obtenerVehiculos() {
        const connection = getPoolConnection ();
        const querySql = `SELECT * FROM vehiculos`;
        const result = await connection.query (querySql);
        return result[0];
    }

    async modificarVehiculo( vehiculo: Vehiculo) {
        const connection = getPoolConnection();
        const querySql = `UPDATE vehiculos SET marca = ?, modelo = ?, year = ? where id = ? `;
        const values = [
            vehiculo.marca,
            vehiculo.modelo,
            vehiculo.year,
            vehiculo.id
        ];
        const result :  [ResultSetHeader, FieldPacket[]]= await connection.query(querySql,values);
        return result [0];

    }

    async eliminarVehiculo (idVehiculo: number) {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM Vehiculos WHERE id = ?`;
        const values = [idVehiculo];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result [0];
    }
}