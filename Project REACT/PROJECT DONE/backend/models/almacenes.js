/* eslint-disable */
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Region from "./region.js";
import Empleado from "./empleados.js";

const Almacen = sequelize.define("Almacen", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
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
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "direccion"
    },
    cod_postal: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cod_postal"
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "telefono"
    },
    id_jefe: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_jefe",
        references: {
            model: Empleado,
            key: "id"
        }
    }
}, {
    timestamps: false,
    tableName: "ALMACENES"
});

Almacen.belongsTo(Region, {foreignKey:"id_region", as: "region", onDelete: "SET NULL"});
Almacen.belongsTo(Empleado, {foreignKey:"id_jefe", as: "jefe", onDelete: "SET NULL"});

export default Almacen;