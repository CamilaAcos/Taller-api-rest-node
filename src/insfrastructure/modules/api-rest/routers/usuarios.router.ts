import Express from "express";
import { UsuarioController } from "../../../controllers/usuarios.controller";

export const usuariosRoutes = () => {
  const router = Express.Router();

  const usuariosCtrl = new UsuarioController();

  router.post("/usuarios", (req, res) => {
  
    const payload = req.body;
    
    usuariosCtrl
      .agregar(payload)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  router.put("/usuarios", (req, res) => {

    const payload = req.body;
    usuariosCtrl
      .modificar(payload)
      .then((result:any) => {
        const status = result.ok === true ? 200 : 400;
        res.status(status).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  router.get("/usuarios", async (_, res) => {
    try {
      const result = await usuariosCtrl.obtener();
      res.send(result);
    } catch (error) {
      res.send({
        message: "Ha ocurrido un error al consultar los usuarios",
      });
    }
  });
  
  router.delete("/usuarios/:id", async (req, res) => {
    try {
      const idStr = req.params.id;
      const id = parseInt(idStr);
      if (Number.isNaN(id)) {
        res.status(400).send({ ok: false, message: "Error en el id enviado" });
        return;
      }
      const result = await usuariosCtrl.eliminar(id);
      const status = result.ok === true ? 200 : 400;
      res.status(status).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
