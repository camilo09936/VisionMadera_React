const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajusta la ruta a tu conexión si es necesario

const BloqueHorario = sequelize.define('BloqueHorario', {
  id_bloque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_bloque'
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'hora_inicio'
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'hora_fin'
  }
}, {
  tableName: 'BLOQUE_HORARIO',
  timestamps: false
});

module.exports = BloqueHorario;