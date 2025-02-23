/* eslint-disable */
import appExpress from "express";
import { createProducto, deleteProducto, getProductosByFilter, obtenerProducto, obtenerProductoPorId, updateProducto } from "../services/producto.services.js"

const productosRouter = appExpress.Router();

productosRouter.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const productos = await getProductosByFilter(req.query.filter);
            res.json(productos);
        }
        else {
            const productos = await obtenerProducto();
            res.json(productos);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productosRouter.get("/:id", async (req, res, next) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        if (producto) {
            res.json(producto);
        }
        else {
            res.status(404).send("Producto not found");
        }
    }
    catch (err) {
        next(err);
    }
});

productosRouter.post("/", async (req, res) => {
    try {
      console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
      const newProducto = await createProducto(req.body);
      if (newProducto.error) {
        res.status(400).json(newProducto);
      } else {
        res.status(201).json(newProducto);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

productosRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteProducto(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

/*
productosRouter.put("/:id", async (req, res, next) => {
    try {
        await updateProducto(req.params.id, req.body);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}); */

productosRouter.put("/:id", async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        console.log('Request body:', req.body);
        const producto = await updateProducto(req.body);
        console.log('Updated producto:', producto);
        return res.json(producto);
    } catch (err) {
        console.error("Error updating producto:", err);
        res.status(500).json({ error: err.message });
    }
});

export default productosRouter;