// ENCARGADO DE CREAR EL SERVIDOR
// El servidor va a proveer el api-rest
 
import Express from "express";
//import { routes } from "./src/infrastructure/modules/api-rest/routers/index.router";
//import middleware404 from "./src/infrastructure/modules/api-rest/middleware/middleware";
 
const createServer = () => {
  const app = Express(); // Se crea la instancia del servidor
 
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
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
  });
};
 
createServer();