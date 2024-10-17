import Express from "express";
import { usuariosRoutes } from "./usuarios.router";
import { vehiculosRoutes } from "./vehiculos.router";
import { reservasRoutes } from "./reservas.router";


export const routes = () => {
  const router = Express.Router();


  // Endpoint o url: http://localhost:3000/hola-mundo
  router.get("/", (req, res) => {
    res.send({ message: "Bienvenido a la API " });
  });

  router.use(usuariosRoutes());
  router.use(vehiculosRoutes());
  router.use(reservasRoutes());
 
 return router;
};
