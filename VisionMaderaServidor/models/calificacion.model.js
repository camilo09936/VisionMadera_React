const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const Calificacion= sequelize.define('Calificacion', {
    id_calificacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    puntaje:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min:1,
            max:5
        }
    },
    comentario:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: true,
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
    id_cita:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'CALIFICACION',
    timestamps: false
});
module.exports = Calificacion;