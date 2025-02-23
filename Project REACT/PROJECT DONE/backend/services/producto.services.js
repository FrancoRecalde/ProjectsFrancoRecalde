/* eslint-disable */
import Inventario from "../models/inventario.js";
import Producto from "../models/producto.js";
import { Op } from "sequelize";

export async function obtenerProducto(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Productos = await Producto.findAll({
            order: [["id", "DESC"]],
        });

        return Productos;
    } catch (error) {
        return { error: error.message };
    }
}

export async function obtenerProductoPorId(id) {
    const producto = await Producto.findByPk(id);
    return producto;
}

export const createProducto = async (data) => {
    try {
        const { nombre, descripcion, precioSugerido, unidades } = data;
        const newProducto = await Producto.create({
            nombre,
            descripcion,
            precioSugerido,
            unidades,
        });
        return newProducto;
    } catch (error) {
        return { error: error.message };
    }
};

/* Update
export async function updateProducto(id, data) {
    const updatedProducto = await Producto.update(data, { where: { id: id } });
    return updatedProducto;
}; */

export async function updateProducto(productoU) {
    const producto = await Producto.findOne({
        where: { id: productoU.id },
    });

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    const [rowsUpdated] = await Producto.update(
        {
            nombre: productoU.nombre,
            descripcion: productoU.descripcion,
            precioSugerido: productoU.precioSugerido,
            unidades: productoU.unidades,
        },
        {
            where: { id: productoU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar el producto");
    }

    const updatedProducto = await Producto.findOne({
        where: { id: productoU.id },
    });

    return updatedProducto;
}

// Delete
export async function deleteProducto(id) {
    const inventarioAlmacen = await Inventario.findOne({
        where: { id_producto: id },
    });
    if (inventarioAlmacen) {
        throw new Error(
            "Error al borrar el producto, tiene un inventario asociado"
        );
    }
    return Producto.destroy({ where: { id: id } });
}

// Función para obtener productos por filtro en nombre o descripcion
export const getProductosByFilter = async (filter) => {
    try {
        const productos = await Producto.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${filter}%` } },
                    { descripcion: { [Op.like]: `%${filter}%` } },
                ],
            },
        });
        return productos;
    } catch (error) {
        return { error: error.message };
    }
};
