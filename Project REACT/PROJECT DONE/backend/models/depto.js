/* eslint-disable */
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Region from "./region.js";

const Depto = sequelize.define("Depto", {
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
    idRegion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_region",
        references: {
            model: Region,
            key: "id"
        }
    }
}, {
    timestamps: false,
    tableName: "DEPTO"
});

Depto.belongsTo(Region, {foreignKey: "idRegion", as: "region", onDelete: "CASCADE"});

export default Depto