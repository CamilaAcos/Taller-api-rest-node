import Express from "express";
import { ReservaController } from "../../../controllers/reservas.controller";

export const reservasRoutes = () => {
  const router = Express.Router();

  const reservasCtrl = new ReservaController();

  router.post("/reservas", (req, res) => {
  
    const payload = req.body;
    
    reservasCtrl
      .agregar(payload)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.put("/reservas", (req, res) => {

    const payload = req.body;
    reservasCtrl
      .modificar(payload)
      .then((result:any) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  router.get("/reservas", async (_, res) => {
    try {
      const result = await reservasCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.send({
        message: "Ha ocurrido un error al consultar los reservas",
      });
    }
  });
  
  router.delete("/reservas/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await reservasCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
