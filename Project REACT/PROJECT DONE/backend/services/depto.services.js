/* eslint-disable */
import Depto from "../models/depto.js";
import Empleado from "../models/empleados.js";
import { Op } from "sequelize";

export async function obtenerDepto(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Deptos = await Depto.findAll({
            order: [["id", "DESC"]],
            include: ["region"],
        });

        return Deptos;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerDeptoPorId(id) {
    const depto = await Depto.findByPk(id);
    return depto;
}

export const createDepto = async (data) => {
    try {
        const { nombre, idRegion } = data;
        const newDepto = await Depto.create({
            nombre,
            idRegion,
        });
        return newDepto;
    } catch (error) {
        return { error: error.message };
    }
};

/* Update
export async function updateDepto(id, data) {
    try {
        const updatedDepto = await Depto.update(data, { where: { id: id } });
        return updatedDepto;
    } catch (error) {
        throw new Error('Error al actualizar el Depto, con el error: ' + error.message);
    }
}; */

export async function updateDepto(deptoU) {
    const depto = await Depto.findOne({
        where: { id: deptoU.id },
    });

    if (!depto) {
        throw new Error("Depto no encontrado");
    }

    const [rowsUpdated] = await Depto.update(
        {
            nombre: deptoU.nombre,
            idRegion: deptoU.idRegion,
        },
        {
            where: { id: deptoU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el depto");
    }

    const updatedDepto = await Depto.findOne({
        where: { id: deptoU.id },
    });

    return updatedDepto;
}

// Delete
export async function deleteDepto(id) {
    const empleadoRegion = await Empleado.findOne({ where: { depto_id: id } });
    if (empleadoRegion) {
        throw new Error(
            "Error al borrar Depto porque tiene un empleado asociado"
        );
    }
    return Depto.destroy({ where: { id: id } });
}

// Función para obtener deptos por filtro en nombre
export const getDeptosByFilter = async (filter) => {
    console.log(filter);
    try {
        const deptos = await Depto.findAll({
            where: {
                nombre: { [Op.like]: `%${filter}%` },
            },
            include: ["region"],
        });
        return deptos;
    } catch (error) {
        console.log(filter);
        return { error: error.message };
    }
};
