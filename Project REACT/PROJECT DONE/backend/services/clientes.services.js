/* eslint-disable */
import Cliente from "../models/clientes.js";
import { Op } from "sequelize";

export async function obtenerCliente(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Clientes = await Cliente.findAll({
            order: [["id", "DESC"]],
            include: ["region", "vendedor"],
        });

        return Clientes;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerClientePorId(id) {
    const cliente = await Cliente.findByPk(id);
    return cliente;
}

export const createCliente = async (data) => {
    try {
        const {
            nombre,
            telefono,
            direccion,
            ciudad,
            estado,
            pais,
            cod_postal,
            calificacion_CREDITO,
            id_vendedor,
            id_region,
            comentarios,
        } = data;
        const newCliente = await Cliente.create({
            nombre,
            telefono,
            direccion,
            ciudad,
            estado,
            pais,
            cod_postal,
            calificacion_CREDITO,
            id_vendedor,
            id_region,
            comentarios,
        });
        return newCliente;
    } catch (error) {
        return { error: error.message };
    }
};

/* Update
export async function updateCliente(id, data) {
    try {
        const updatedCliente = await Cliente.update(data, { where: { id: id } });
        return updatedCliente;
    } catch (error) {
        throw new Error('Error al actualizar el Cliente, con el siguiente error: ' + error.message);
    }
}; */

export async function updateCliente(clienteU) {
    const cliente = await Cliente.findOne({
        where: { id: clienteU.id },
    });

    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    const [rowsUpdated] = await Cliente.update(
        {
            nombre: clienteU.nombre,
            telefono: clienteU.telefono,
            direccion: clienteU.direccion,
            ciudad: clienteU.ciudad,
            estado: clienteU.estado,
            pais: clienteU.pais,
            cod_postal: clienteU.cod_postal,
            calificacion_CREDITO: clienteU.calificacion_CREDITO,
            id_vendedor: clienteU.id_vendedor,
            id_region: clienteU.id_region,
            comentarios: clienteU.comentarios,
        },
        {
            where: { id: clienteU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el cliente");
    }

    const updatedCliente = await Cliente.findOne({
        where: { id: clienteU.id },
    });

    return updatedCliente;
}

// Delete
export async function deleteCliente(id) {
    return Cliente.destroy({ where: { id: id } });
}

// Función para obtener clientes por filtro en nombre o telefono
export const getClientesByFilter = async (filter) => {
    try {
        const clientes = await Cliente.findAll({
            where: {
                [Op.or]: [
                    { telefono: { [Op.like]: `%${filter}%` } },
                    { nombre: { [Op.like]: `%${filter}%` } },
                ],
            },
            include: ["region", "vendedor"],
        });
        return clientes;
    } catch (error) {
        return { error: error.message };
    }
};
