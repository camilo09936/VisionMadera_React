const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Cita= sequelize.define('Cita',{
    id_cita:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    id_estado_cita:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_sede:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_disenador:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'CITA',
    timestamps: false
});
module.exports= Cita;