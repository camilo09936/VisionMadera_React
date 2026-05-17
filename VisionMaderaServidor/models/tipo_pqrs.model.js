const { DataTypes }= require('sequelize');
const sequelize= require('../config/db');
const TipoPqrs= sequelize.define("TipoPqrs", {
    id_tipo_pqrs:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},{
    tableName: 'TIPO_PQRS',
    timestamps: false
});
module.exports = TipoPqrs;