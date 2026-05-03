const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MetodoPago = sequelize.define('MetodoPago', {
    id_metodo_pago: {
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
    tableName: 'METODO_PAGO',
    timestamps: false
});

module.exports = MetodoPago;
