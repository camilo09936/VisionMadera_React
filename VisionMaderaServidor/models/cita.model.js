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
        allowNull: false,
        get(){
            const val= this.getDataValue('fecha');
            if(!val) return null;
            if(typeof val === 'string') return val.split("T")[0];
            if(val instanceof Date){
                const y= val.getUTCFullYear();
                const m= String(val.getUTCMonth()+1).padStart(2, '0');
                const d= String(val.getUTCDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
            return val;
        }
    },
    id_bloque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_estado_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
    },
    documento: {
        type: DataTypes.STRING(20),
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