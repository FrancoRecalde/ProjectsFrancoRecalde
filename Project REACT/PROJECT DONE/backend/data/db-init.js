/* eslint-disable no-unused-vars */
// Import sequelize
import sequelize from "./db.js";

// Import de los Modelos
import Almacen from "../models/almacenes.js"
import Cliente from "../models/clientes.js"
import Depto from "../models/depto.js"
import Empleado from "../models/empleados.js"
import Producto from "../models/producto.js"
import Region from "../models/region.js"

// Función para sincronizar los modelos con la base de datos
async function dbInit() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos");
    }
    catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default dbInit;
