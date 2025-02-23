/* eslint-disable */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import dbInit from "./data/db-init.js";

import empleadosRouter from "./routes/empleados.router.js";
import clientesRouter from "./routes/clientes.router.js";
import almacenesRouter from "./routes/almacenes.router.js";
import deptoRouter from "./routes/depto.router.js";
import inventarioRouter from "./routes/intentario.router.js";
import productoRouter from "./routes/producto.router.js";
import regionRouter from "./routes/region.router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));

app.get("/status", (req, res) => {
  res.json({ respuesta: "API iniciada y escuchando..." });
});

app.use("/api/empleados", empleadosRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/almacenes", almacenesRouter);
app.use("/api/deptos", deptoRouter);
app.use("/api/inventarios", inventarioRouter);
app.use("/api/productos", productoRouter);
app.use("/api/regiones", regionRouter);

(async function start() {
  const PORT = process.env.PORT || 3001;

  // Inicializar la conexión a la base de datos
  await dbInit();

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
  });
})();
