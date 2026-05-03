const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pago = sequelize.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_metodo_pago: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_estado_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    fecha_pago: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    id_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'PAGO',
    timestamps: false
});

module.exports = Pago;
