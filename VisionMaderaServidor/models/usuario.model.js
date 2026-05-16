const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Usuario= sequelize.define("Usuario",{
    documento:{
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    nombre1:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    apellido1:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName:'USUARIO',
    timestamps: false
});
module.exports = Usuario;