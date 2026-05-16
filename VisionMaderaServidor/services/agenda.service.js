const AgendaDisenador = require('../models/agenda_disenador.model');
const BloqueHorario = require('../models/bloque_horario.model');

exports.obtenerHorarios = async (id_disenador, dia_semana) => {
  return await AgendaDisenador.findAll({
    where: {
      id_disenador: id_disenador,
      dia_semana: dia_semana
    },
    include: [
      {
        model: BloqueHorario,
        as: 'BloqueHorario'
      }
    ]
  });
};