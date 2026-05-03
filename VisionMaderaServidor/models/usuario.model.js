const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Usuario= sequelize.define("Usuario",{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula:{
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