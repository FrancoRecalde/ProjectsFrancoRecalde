/* eslint-disable */
import appExpress from "express";
import { createInventario, deleteInventario, getInventariosByFilter, obtenerInventario, obtenerInventarioPorId, updateInventario } from "../services/inventario.services.js"

const inventarioRouter = appExpress.Router();

inventarioRouter.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const inventarios = await getInventariosByFilter(req.query.filter);
            res.json(inventarios);
        }
        else {
            const inventarios = await obtenerInventario();
            res.json(inventarios);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


inventarioRouter.get("/:idProducto/:idAlmacenes", async (req, res, next) => {
    const { idProducto, idAlmacenes } = req.params;
    try {
        const inventario = await obtenerInventarioPorId(idProducto, idAlmacenes);
        if (inventario) {
            res.json(inventario);
        } else {
            res.status(404).send("Inventario not found")
        }
    } catch (e) {
        next(e);
    }
});

inventarioRouter.post("/", async (req, res) => {
    try {
      console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
      const newInventario = await createInventario(req.body);
      if (newInventario.error) {
        res.status(400).json(newInventario);
      } else {
        res.status(201).json(newInventario);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

inventarioRouter.delete("/:idProducto/:idAlmacenes", async (req, res, next) => {
    try {
        await deleteInventario(req.params.idProducto, req.params.idAlmacenes);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

/*
inventarioRouter.put("/:id", async (req, res, next) => {
    try {
        await updateInventario(req.params.id, req.body);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});*/

inventarioRouter.put("/:idProducto/:idAlmacenes", async (req, res, next) => {
    try {
        req.body.idAlmacenes = req.params.idAlmacenes;
        req.body.idProducto = req.params.idProducto;
        console.log('Request body producto:', req.body.idProducto);
        console.log('Request body almacenes:', req.body.idAlmacenes);
        const inventario = await updateInventario(req.body);
        console.log('Updated inventario:', inventario);
        return res.json(inventario);
    } catch (err) {
        console.error("Error updating inventario:", err);
        res.status(500).json({ error: err.message });
    }
  });

export default inventarioRouter;