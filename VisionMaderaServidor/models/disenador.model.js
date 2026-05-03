const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Disenador= sequelize.define('Disenador', {
    id_disenador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id_sede:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'DISENADOR',
    timestamps: false
});
module.exports = Disenador;