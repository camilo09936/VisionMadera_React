const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cita = sequelize.define('Cita', {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_bloque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
    id_estado_cita: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_sede: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_disenador: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'CITA',
    timestamps: false
});

module.exports = Cita;