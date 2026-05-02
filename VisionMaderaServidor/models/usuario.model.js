const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Usuario= sequelize.define("Usuario",{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    apellido:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    contrasena:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    cedula:{
        type: DataTypes.STRING
    },
    fecha_nacimiento:{
        type: DataTypes.DATE
    }
},{
    tableName:'USUARIO',
    timestamps: false
});
module.exports = Usuario;