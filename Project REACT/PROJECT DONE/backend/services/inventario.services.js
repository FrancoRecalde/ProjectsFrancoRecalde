/* eslint-disable */
import Inventario from "../models/inventario.js";
import { Op } from "sequelize";

export async function obtenerInventario(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Inventarios = await Inventario.findAll({
            include: ["producto", "almacen"],
        });

        return Inventarios;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerInventarioPorId(productoId, almacenId) {
    try {
        const inventario = await Inventario.findOne({
            where: {
                idProducto: productoId,
                idAlmacenes: almacenId,
            },
        });
        return inventario;
    } catch (error) {
        throw new Error("Error al obtener el inventario: " + error.message);
    }
}

export const createInventario = async (data) => {
    try {
        const {
            idProducto,
            idAlmacenes,
            cantEnStock,
            maxEnStock,
            fechaDeRestock,
        } = data;
        const newInventario = await Inventario.create({
            idProducto,
            idAlmacenes,
            cantEnStock,
            maxEnStock,
            fechaDeRestock,
        });
        return newInventario;
    } catch (error) {
        return { error: error.message };
    }
};

/* Update
export async function updateInventario(idProducto, idAlmacenes, data) {
    try {
        const updatedInventario = await Inventario.findOne(data, { where: { idProducto: idProducto, idAlmacenes: idAlmacenes } });
        return updatedInventario;
    } catch (error) {
        throw new Error('Error al actualizar el inventario, con el siguiente mensaje: ' + error.message);
    }
};*/

export async function updateInventario(inventarioU) {
    const inventario = await Inventario.findOne({
        where: {
            idProducto: inventarioU.idProducto,
            idAlmacenes: inventarioU.idAlmacenes,
        },
    });

    if (!inventario) {
        throw new Error("Inventario no encontrado");
    }

    const [rowsUpdated] = await Inventario.update(
        {
            cantEnStock: inventarioU.cantEnStock,
            maxEnStock: inventarioU.maxEnStock,
            fechaDeRestock: inventarioU.fechaDeRestock,
        },
        {
            where: {
                idProducto: inventarioU.idProducto,
                idAlmacenes: inventarioU.idAlmacenes,
            },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el inventario");
    }

    const updatedInventario = await Inventario.findOne({
        where: {
            idProducto: inventarioU.idProducto,
            idAlmacenes: inventarioU.idAlmacenes,
        },
    });

    return updatedInventario;
}

// Delete
export async function deleteInventario(idProducto, idAlmacenes) {
    return Inventario.destroy({
        where: { idProducto: idProducto, idAlmacenes: idAlmacenes },
    });
}

// Función para obtener inventarios por filtro por idProducto o idAlmacenes
export const getInventariosByFilter = async (filter) => {
    try {
        const inventarios = await Inventario.findAll({
            where: {
                [Op.or]: [
                    { idAlmacenes: { [Op.like]: `%${filter}%` } },
                ],
            },
            include: ["producto", "almacen"],
        });
        return inventarios;
    } catch (error) {
        return { error: error.message };
    }
};
