
 
import Express from "express";
import { routes} from "../Taller-api-rest-node/src/insfrastructure/modules/api-rest/routers/index.router";
import middleware404 from "./src/insfrastructure/modules/api-rest/middleware/middleware"; 
 
const createServer = () => {
  const app = Express(); 
 
  // Middleware: Para parsear el json de las solicitudes
  app.use(Express.json());
 
  // Generación del primero recurso:
  // Endpoint o url: http://localhost:3000/hola-mundo
  app.get("/api", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });
 
  /// Importar la rutas
  app.use("/api/v1", routes());
 
  app.use(middleware404);
 
  // Generar 
  const PORT = process.env.PORT || 3006;
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};
 
createServer();