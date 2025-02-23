/* eslint-disable */
import {DataTypes} from "sequelize"
import sequelize from "../data/db.js"

const Region = sequelize.define("Region", {
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
    }
},{
    timestamps:false,
    tableName:"REGION"
})

export default Region