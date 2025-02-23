/* eslint-disable */
import appExpress from "express";
import { createEmpleados, deleteEmpleado, getEmpleadosByFilter, obtenerEmpleado, obtenerEmpleadoPorId, updateEmpleado } from "../services/empleados.services.js";

const empleadosRouter = appExpress.Router();

empleadosRouter.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const empleados = await getEmpleadosByFilter(req.query.filter);
            res.json(empleados);
        }
        else {
            const empleados = await obtenerEmpleado();
            res.json(empleados);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

empleadosRouter.get("/:id", async (req, res, next) => {
    try {
        const empeado = await obtenerEmpleadoPorId(req.params.id);
        if (empeado) {
            res.json(empeado);
        }
        else {
            res.status(404).send("Empleado not found");
        }
    }
    catch (err) {
        next(err);
    }
});

empleadosRouter.post("/", async (req, res) => {
    try {
        console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
        const newEmpleado = await createEmpleados(req.body);
        if (newEmpleado.error) {
            res.status(400).json(newEmpleado);
        } else {
            res.status(201).json(newEmpleado);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

empleadosRouter.delete("/:id", async (req, res, next) => {
    try {
        await deleteEmpleado(req.params.id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});

/*
empleadosRouter.put("/:id", async (req, res, next) => {
    try {
        await updateEmpleado(req.params.id, req.body);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}); */

empleadosRouter.put("/:id", async (req, res, next) => {
    try {
        req.body.id = req.params.id;
        console.log('Request body:', req.body);
        const empleado = await updateEmpleado(req.body);
        console.log('Updated empleado:', empleado);
        return res.json(empleado);
    } catch (err) {
        console.error("Error updating empleado:", err);
        res.status(500).json({ error: err.message });
    }
});

export default empleadosRouter;
