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
        allowNull: true
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