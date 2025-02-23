/* eslint-disable */
import appExpress from "express";
import { createAlmacen, deleteAlmacen, getAlmacenesByFilter, obtenerAlmacen, obtenerAlmacenPorId, updateAlmacen } from "../services/almacenes.services.js";

const almacenesRouter = appExpress.Router();

almacenesRouter.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const almacenes = await getAlmacenesByFilter(req.query.filter);
            res.json(almacenes);
        }
        else {
            const almacenes = await obtenerAlmacen();
            res.json(almacenes);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

almacenesRouter.get("/:id", async (req, res, next) => {
    try {
        const almacen = await obtenerAlmacenPorId(req.params.id);
        if (almacen) {
            res.json(almacen);
        }
        else {
            res.status(404).send("Almacen not found");
        }
    }
    catch (err) {
        next(err);
    }
});

almacenesRouter.post("/", async (req, res) => {
    try {
      console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
      const newAlmacen = await createAlmacen(req.body);
      if (newAlmacen.error) {
        res.status(400).json(newAlmacen);
      } else {
        res.status(201).json(newAlmacen);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

almacenesRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteAlmacen(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

almacenesRouter.put("/:id", async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        console.log('Request body:', req.body);
        const almacen = await updateAlmacen(req.body);
        console.log('Updated almacen:', almacen);
        return res.json(almacen);
    } catch (err) {
        console.error("Error updating almacen:", err);
        res.status(500).json({ error: err.message });
    }
});

/*
almacenesRouter.put("/:id", async (req, res, next) => {
    try {
        await updateAlmacen(req.params.id, req.body);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}); */

export default almacenesRouter;
