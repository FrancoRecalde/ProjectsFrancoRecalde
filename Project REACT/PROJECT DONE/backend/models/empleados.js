/* eslint-disable */
import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Depto from "./depto.js";

const Empleado = sequelize.define("Empleado", {
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
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "apellido"
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_usuario"
    },
    fecha_ingreso: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "fecha_ingreso"
    },
    comentarios: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "comentarios"
    },
    id_jefe: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_jefe",
        references: {
            model: 'Empleado',
            key: "id"
        }
    },
    depto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "depto_id",
        references: {
            model: Depto,
            key: "id"
        }
    },
    salario: {
        type: DataTypes.REAL,
        allowNull: false,
        field: "salario"
    },
    porcent_comission: {
        type: DataTypes.REAL,
        allowNull: true,
        field: "porcent_comission"
    }
}, {
    timestamps: false,
    tableName: "EMPLEADOS"
});

Empleado.belongsTo(Empleado, {foreignKey: "id_jefe", as: "jefe", onDelete: "CASCADE"});
Empleado.belongsTo(Depto, {foreignKey: "depto_id", as:"depto", onDelete: "CASCADE"})

export default Empleado;
