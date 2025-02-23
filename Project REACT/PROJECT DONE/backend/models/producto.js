/* eslint-disable */
import {DataTypes} from "sequelize"
import sequelize from "../data/db.js"

const Producto = sequelize.define("Producto", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field:"id"
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false,
        field:"nombre"
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
        field:"descripcion"
    },
    precioSugerido:{
        type: DataTypes.REAL,
        allowNull:false,
        field:"precio_sugerido"
    },
    unidades:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:"unidades"
    }

},{
    timestamps:false,
    tableName:"PRODUCTO"
})

export default Producto