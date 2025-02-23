/* eslint-disable */
import appExpress from "express";
import {
  createRegion,
  deleteRegion,
  getRegionesByFilter,
  obtenerRegion,
  obtenerRegionPorId,
  updateRegion,
} from "../services/region.services.js";

const regionRouter = appExpress.Router();

regionRouter.get("/", async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const regiones = await getRegionesByFilter(req.query.filter);
      res.json(regiones);
    } else {
      const regiones = await obtenerRegion();
      res.json(regiones);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

regionRouter.get("/:id", async (req, res, next) => {
  try {
    const region = await obtenerRegionPorId(req.params.id);
    if (region) {
      res.json(region);
    } else {
      res.status(404).send("Region not found");
    }
  } catch (err) {
    next(err);
  }
});

regionRouter.post("/", async (req, res) => {
  try {
    console.log("DATOS RECIBIDOS EN EL BACKEND:", req.body);
    const newRegion = await createRegion(req.body);
    if (newRegion.error) {
      res.status(400).json(newRegion);
    } else {
      res.status(201).json(newRegion);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

regionRouter.delete("/:id", async (req, res, next) => {
  try {
    await deleteRegion(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

/*
regionRouter.put("/:id", async (req, res, next) => {
  try {
    await updateRegion(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}); */

regionRouter.put("/:id", async (req, res, next) => {
  try {
      req.body.id = req.params.id;
      console.log('Request body:', req.body);
      const region = await updateRegion(req.body);
      console.log('Updated region:', region);
      return res.json(region);
  } catch (err) {
      console.error("Error updating region:", err);
      res.status(500).json({ error: err.message });
  }
});

export default regionRouter;
