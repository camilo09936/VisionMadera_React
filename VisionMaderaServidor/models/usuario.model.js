const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Usuario= sequelize.define("Usuario",{
    documento:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    nombre1:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nombre2:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    apellido1:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido2:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    correo:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    contrasena:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fecha_nacimiento:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    tableName:'USUARIO',
    timestamps: false
});
module.exports = Usuario;