const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const BloqueHorario = require('./bloque_horario.model'); 

const AgendaDisenador = sequelize.define('AgendaDisenador', {
  id_agenda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_agenda'
  },
  id_disenador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_disenador'
  },
  dia_semana: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'dia_semana'
  },
  id_bloque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_bloque'
  }
}, {
  tableName: 'AGENDA_DISENADOR',
  timestamps: false
});

// Una agenda pertenece a un bloque horario específico
AgendaDisenador.belongsTo(BloqueHorario, { foreignKey: 'id_bloque', as: 'BloqueHorario' });

module.exports = AgendaDisenador;