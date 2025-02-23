/* eslint-disable */
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Empleado from "./empleados.js";
import Region from "./region.js";

const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nombre"
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "telefono"
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "direccion"
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "ciudad"
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "estado"
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pais"
    },
    cod_postal: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cod_postal"
    },
    calificacion_CREDITO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "calificacion_CREDITO"
    },
    id_vendedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_vendedor",
        references: {
            model: Empleado,
            key: "id"
        }
    },
    id_region: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_region",
        references: {
            model: Region,
            key: "id"
        }
    },
    comentarios: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "comentarios"
    }
}, {
    timestamps: false,
    tableName: "CLIENTES"
});

Cliente.belongsTo(Empleado, {foreignKey:"id_vendedor", as: "vendedor", onDelete: "CASCADE"});
Cliente.belongsTo(Region, {foreignKey: "id_region", as: "region", onDelete: "CASCADE"});

export default Cliente;
