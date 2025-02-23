/* eslint-disable */
import appExpress from "express";
import { createCliente, deleteCliente, getClientesByFilter, obtenerCliente, obtenerClientePorId, updateCliente } from "../services/clientes.services.js"

const clientesRouter = appExpress.Router();

clientesRouter.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const clientes = await getClientesByFilter(req.query.filter);
            res.json(clientes);
        }
        else {
            const clientes = await obtenerCliente();
            res.json(clientes);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

clientesRouter.get("/:id", async (req, res, next) => {
    try {
        const cliente = await obtenerClientePorId(req.params.id);
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).send("Cliente not found");
        }
    }
    catch (err) {
        next(err);
    }
});

clientesRouter.post("/", async (req, res) => {
    try {
      console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
      const newCliente = await createCliente(req.body);
      if (newCliente.error) {
        res.status(400).json(newCliente);
      } else {
        res.status(201).json(newCliente);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

clientesRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteCliente(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

/*
clientesRouter.put("/:id", async (req, res, next) => {
    try {
        await updateCliente(req.params.id, req.body);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}); */

clientesRouter.put("/:id", async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        console.log('Request body:', req.body);
        const cliente = await updateCliente(req.body);
        console.log('Updated cliente:', cliente);
        return res.json(cliente);
    } catch (err) {
        console.error("Error updating cliente:", err);
        res.status(500).json({ error: err.message });
    }
});

export default clientesRouter;