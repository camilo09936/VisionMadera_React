const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Sede= sequelize.define('Sede', {
    id_sede:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'SEDE',
    timestamps: false
});
module.exports = Sede;