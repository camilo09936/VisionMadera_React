const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const PQRS= sequelize.define('PQRS', {
    id_pqrs:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_pqrs:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_estado_pqrs:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'PQRS',
    timestamps: false
});
module.exports = PQRS;