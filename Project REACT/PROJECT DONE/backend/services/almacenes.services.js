/* eslint-disable */
import Almacen from "../models/almacenes.js";
import Inventario from "../models/inventario.js";
import { Op } from "sequelize";
export async function obtenerAlmacen(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const almacen = await Almacen.findAll({
            order: [["id", "DESC"]],
            include: ["region", "jefe"],
        });
        return almacen;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerAlmacenPorId(id) {
    const almacen = await Almacen.findByPk(id);
    return almacen;
}

export const createAlmacen = async (data) => {
    try {
        const { id_region, direccion, cod_postal, telefono, id_jefe } = data;
        const newAlmacen = await Almacen.create({
            id_region,
            direccion,
            cod_postal,
            telefono,
            id_jefe,
        });
        return newAlmacen;
    } catch (error) {
        return { error: error.message };
    }
};

// Delete - Compruebo si hay almacenes que lo referencian por FK
export async function deleteAlmacen(id) {
    const inventarioAlmacen = await Inventario.findOne({
        where: { id_almacenes: id },
    });
    if (inventarioAlmacen) {
        throw new Error(
            "Error al borrar el Almacen, tiene inventarios asociados"
        );
    }
    return Almacen.destroy({ where: { id: id } });
}

/* Update
export async function updateAlmacen(id, data) {
    try {
        const updatedAlmacen = await Almacen.update(data, { where: { id: id } });
        return updatedAlmacen;
    } catch (error) {
        throw new Error('Error al actualizar el Almacen, con el siguiente error: ', + error.message);
    }
}; */

export async function updateAlmacen(almacenU) {
    const almacen = await Almacen.findOne({
        where: { id: almacenU.id },
    });

    if (!almacen) {
        throw new Error("Almacen no encontrado");
    }

    const [rowsUpdated] = await Almacen.update(
        {
            id_region: almacenU.id_region,
            direccion: almacenU.direccion,
            cod_postal: almacenU.cod_postal,
            telefono: almacenU.telefono,
            id_jefe: almacenU.id_jefe,
        },
        {
            where: { id: almacenU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el almacen");
    }

    const updatedAlmacen = await Almacen.findOne({
        where: { id: almacenU.id },
    });

    return updatedAlmacen;
}

// Función para obtener almacenes por filtro en direccion, cod_postal o telefono (VARCHAR)
export const getAlmacenesByFilter = async (filter) => {
    try {
        const almacenes = await Almacen.findAll({
            where: {
                [Op.or]: [
                    { direccion: { [Op.like]: `%${filter}%` } },
                    { cod_postal: { [Op.like]: `%${filter}%` } },
                    { telefono: { [Op.like]: `%${filter}%` } },
                ],
            },
            include: ["region", "jefe"],
        });
        console.log(almacenes);
        return almacenes;
    } catch (error) {
        console.log(filter);
        return { error: error.message };
    }
};
