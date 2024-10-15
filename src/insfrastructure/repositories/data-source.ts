import mysql from "mysql2/promise";

import config  from "../../../config/default";

export const getPoolConnection = ()=> {
    const connection = mysql.createPool({
        host: config.HOST,
        user:  config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        port:  config.PORT,
    });
    return connection;
}