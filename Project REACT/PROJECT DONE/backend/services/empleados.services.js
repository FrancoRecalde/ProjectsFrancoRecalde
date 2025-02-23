/* eslint-disable */
import Empleado from "../models/empleados.js";
import { Op } from "sequelize";

export async function obtenerEmpleado(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Empleados = await Empleado.findAll({
            order: [["id", "DESC"]],
            include: ["jefe", "depto"],
        });

        return Empleados;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerEmpleadoPorId(id) {
    const empeado = await Empleado.findByPk(id);
    return empeado;
}

export const createEmpleados = async (data) => {
    try {
        const {
            nombre,
            apellido,
            id_usuario,
            fecha_ingreso,
            comentarios,
            id_jefe,
            depto_id,
            salario,
            porcent_comission,
        } = data;
        const newEmpleado = await Empleado.create({
            nombre,
            apellido,
            id_usuario,
            fecha_ingreso,
            comentarios,
            id_jefe,
            depto_id,
            salario,
            porcent_comission,
        });
        return newEmpleado;
    } catch (error) {
        return { error: error.message };
    }
};

/* Update
export async function updateEmpleado(id, data) {
    const updatedEmpleado = await Empleado.update(data, { where: { id: id } });
    return updatedEmpleado;
}; */

export async function updateEmpleado(empleadoU) {
    const empleado = await Empleado.findOne({
        where: { id: empleadoU.id },
    });

    if (!empleado) {
        throw new Error("Empleado no encontrado");
    }
    console.log("FECHA BACK:", empleadoU.fecha_ingreso);
    const [rowsUpdated] = await Empleado.update(
        {
            nombre: empleadoU.nombre,
            apellido: empleadoU.apellido,
            id_usuario: empleadoU.id_usuario,
            fecha_ingreso: empleadoU.fecha_ingreso,
            comentarios: empleadoU.comentarios,
            id_jefe: empleadoU.id_jefe,
            depto_id: empleadoU.depto_id,
            salario: empleadoU.salario,
            porcent_comission: empleadoU.porcent_comission,
        },
        {
            where: { id: empleadoU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el empleado");
    }

    const updatedEmpleado = await Empleado.findOne({
        where: { id: empleadoU.id },
    });

    return updatedEmpleado;
}

// Delete
export async function deleteEmpleado(id) {
    const empleadosConJefe = await Empleado.findOne({ where: { id_jefe: id } });
    const almacenesConJefe = await Empleado.findOne({ where: { id_jefe: id } });
    if (empleadosConJefe && almacenesConJefe) {
        throw new Error(
            "Error al borrar el Empleado, tiene un empleado o almacen asociado"
        );
    }
    return Empleado.destroy({ where: { id: id } });
}

// Función para obtener clientes por filtro en nombre o apellido
export const getEmpleadosByFilter = async (filter) => {
    try {
        const empleados = await Empleado.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${filter}%` } },
                    { apellido: { [Op.like]: `%${filter}%` } },
                ],
            },
            include: ["jefe", "depto"],
        });
        return empleados;
    } catch (error) {
        return { error: error.message };
    }
};
