/* eslint-disable */
import Almacen from "../models/almacenes.js";
import Depto from "../models/depto.js";
import Region from "../models/region.js";
import {Op} from "sequelize"


export async function obtenerRegion(req, res) {
    // Consulta a la base de datos para traer las filas de la tabla barrios
    //  como objetos y retornar ese conjunto como un vector json.
    try {
        // realizo la consulta a la base de datos.
        const Regions = await Region.findAll({
            order: [['id', 'DESC']]
        });

        return Regions;
    }
    catch (error) {
        return { error: error.message };
    }
};

export async function obtenerRegionPorId(id) {
    const region = await Region.findByPk(id);
    return region;
};

export const createRegion = async (data) => {
    try {
      const { nombre } = data;
      if (!nombre) {
        throw new Error('El nombre es requerido');
      }
  
      const newRegion = await Region.create({
        nombre
      });
      return newRegion;
    } catch (error) {
      return { error: error.message };
    }
  };  

/* Update
export async function updateRegion(id, data) {
    try {
        const updatedRegion = await Region.update(data, { where: { id: id } });
        return updatedRegion;
    } catch (error) {
        throw new Error('Error al borrar region, con el siguiente mensaje: ' + error.message);
    };
}; */

export async function updateRegion(regionU) {
    const region = await Region.findOne({
        where: { id: regionU.id },
    });

    if (!region) {
        throw new Error("Region no encontrada");
    }

    const [rowsUpdated] = await Region.update(
        {
            nombre: regionU.nombre
        },
        {
            where: { id: regionU.id },
        }
    );

    console.log(`Rows updated: ${rowsUpdated}`);

    if (rowsUpdated === 0) {
        throw new Error("No se pudo actualizar la region");
    }

    const updatedRegion = await Region.findOne({
        where: { id: regionU.id },
    });

    return updatedRegion;
};

// Delete
export async function deleteRegion(id) {
    const clientesDepto = await Depto.findOne({ where: { id_region: id } });
    const almacenesDepto = await Almacen.findOne({ where: { id_region: id } });
    if (clientesDepto && almacenesDepto) {
        throw new Error('Error al borrar la region, tiene clientes o deptos asociados');
    };
    return Region.destroy({ where: { id: id } });
};

// Función para obtener regiones por filtro en nombre
export const getRegionesByFilter = async (filter) => {
    console.log(filter)
    try {
        const regiones = await Region.findAll({
            where: {
                nombre: { [Op.like]: `%${filter}%` },
            }
        });
        console.log(regiones)
        return regiones;
    }
    catch (error) {
        console.log(error)
        return { error: error.message };
    }
};
