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
        defaultValue: DataTypes.NOW,
        get() {
            const val = this.getDataValue('fecha');
            if (!val) return null;
            if (typeof val === 'string') return val.split('T')[0];
            if (val instanceof Date) {
                const y = val.getUTCFullYear();
                const m = String(val.getUTCMonth() + 1).padStart(2, '0');
                const d = String(val.getUTCDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
            return val;
        }
    },
    id_estado_pqrs:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    documento:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'PQRS',
    timestamps: false
});
module.exports = PQRS;