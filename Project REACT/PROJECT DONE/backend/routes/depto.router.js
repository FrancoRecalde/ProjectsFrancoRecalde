/* eslint-disable */
import appExpress from "express";
import {
  createDepto,
  deleteDepto,
  getDeptosByFilter,
  obtenerDepto,
  obtenerDeptoPorId,
  updateDepto,
} from "../services/depto.services.js";

const deptoRouter = appExpress.Router();

deptoRouter.get("/", async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const deptos = await getDeptosByFilter(req.query.filter);
      res.json(deptos);
    } else {
      const deptos = await obtenerDepto();
      res.json(deptos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

deptoRouter.get("/:id", async (req, res, next) => {
  try {
    const depto = await obtenerDeptoPorId(req.params.id);
    if (depto) {
      res.json(depto);
    } else {
      res.status(404).send("Depto not found");
    }
  } catch (err) {
    next(err);
  }
});

deptoRouter.post("/", async (req, res) => {
  try {
    console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
    const newDepto = await createDepto(req.body);
    if (newDepto.error) {
      res.status(400).json(newDepto);
    } else {
      res.status(201).json(newDepto);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

deptoRouter.put("/:id", async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    console.log("Request body:", req.body);
    const depto = await updateDepto(req.body);
    console.log("Updated depto:", depto);
    return res.json(depto);
  } catch (err) {
    console.error("Error updating depto:", err);
    res.status(500).json({ error: err.message });
  }
});

deptoRouter.delete("/:id", async (req, res, next) => {
  try {
      await deleteDepto(req.params.id);
      res.sendStatus(200);
  }
  catch (err) {
      next(err);
  }
});

export default deptoRouter;
