const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const EstadoCita= sequelize.define('EstadoCita', {
    id_estado_cita:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: 'ESTADO_CITA',
    timestamps: false
});
module.exports=EstadoCita;