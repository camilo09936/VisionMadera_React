const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const EstadoPqrs= sequelize.define('EstadoPqrs', {
    id_estado_pqrs:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},{
    tableName: 'ESTADO_PQRS',
    timestamps: false
});
module.exports = EstadoPqrs;