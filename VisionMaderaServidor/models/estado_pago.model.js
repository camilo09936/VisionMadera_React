const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EstadoPago = sequelize.define('EstadoPago', {
    id_estado_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'ESTADO_PAGO',
    timestamps: false
});

module.exports = EstadoPago;
