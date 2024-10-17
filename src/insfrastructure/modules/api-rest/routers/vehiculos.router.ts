import Express from "express";
import { VehiculoController } from "../../../controllers/vahiculos.controller";

export const vehiculosRoutes = () => {
  const router = Express.Router();

  const vehiculosCtrl = new VehiculoController();

  router.post("/vehiculos", (req, res) => {
  
    const payload = req.body;
    
    vehiculosCtrl
      .agregar(payload)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.put("/vehiculos", (req, res) => {

    const payload = req.body;
    vehiculosCtrl
      .modificar(payload)
      .then((result:any) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  router.get("/vehiculos", async (_, res) => {
    try {
      const result = await vehiculosCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.send({
        message: "Ha ocurrido un error al consultar los vehiculos",
      });
    }
  });
  
  router.delete("/vehiculos/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await vehiculosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
