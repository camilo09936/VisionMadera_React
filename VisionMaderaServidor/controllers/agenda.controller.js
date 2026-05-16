const agendaService = require('../services/agenda.service');

exports.getHorariosDisponibles = async (req, res) => {
  try {
    const { id_disenador, dia_semana } = req.query;

    if (!id_disenador || !dia_semana) {
      return res.status(400).json({ error: "Faltan parámetros requeridos: id_disenador y dia_semana" });
    }

    const horarios = await agendaService.obtenerHorarios(id_disenador, dia_semana);
    res.json(horarios);
  } catch (error) {
    console.error("Error en getHorariosDisponibles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};