/* eslint-disable */
import {DataTypes} from "sequelize"
import sequelize from "../data/db.js"
import Producto from "./producto.js"
import Almacen from "./almacenes.js"

const Inventario = sequelize.define("Inventario", {
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field:"id_producto",
        references: {
            model: Producto,
            key: "id"
        }
    },
    idAlmacenes:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        field:"id_almacenes",
        references: {
            model: Almacen,
            key: "id"
        }
    },
    cantEnStock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:"cant_en_stock",
    },
    maxEnStock:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:"max_en_stock"
    },
    fechaDeRestock:{
        type:DataTypes.STRING,
        allowNull:false,
        field:"fecha_de_restock"
    }

},{
    timestamps:false,
    tableName:"INVENTARIO"
});

Inventario.belongsTo(Producto, {foreignKey: "idProducto", as:"producto", onDelete: "CASCADE"});
Inventario.belongsTo(Almacen, {foreignKey: "idAlmacenes", as: "almacen", onDelete: "CASCADE"});

export default Inventario