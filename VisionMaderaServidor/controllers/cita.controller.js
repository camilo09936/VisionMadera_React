const citaService = require('../services/cita.service');

// Obtener todas las citas
exports.getAll = async (req, res) => {
    try {
        const citas = await citaService.getAll();
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las citas" });
    }
};

// Obtener cita por ID
exports.getById = async (req, res) => {
    try {
        const cita = await citaService.getById(req.params.id);
        if (!cita) return res.status(404).json({ error: "Cita no encontrada" });
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar la cita" });
    }
};

// Controlar bloques ocupados con respuesta segura por defecto
exports.getBloquesOcupados = async (req, res) => {
    try {
        const { fecha, id_disenador } = req.query;

        if (!fecha || !id_disenador) {
            return res.status(200).json([]); // Devolvemos vacío si faltan datos iniciales
        }

        const bloquesOcupados = await citaService.getBloquesOcupados(fecha, id_disenador);
        return res.status(200).json(bloquesOcupados || []);

    } catch (error) {
        console.error("Error en controller (getBloquesOcupados):", error);
        // Si hay un error de base de datos, respondemos con un array vacío para no bloquear el select de React
        return res.status(200).json([]); 
    }
};

// Crear una nueva cita
exports.create = async (req, res) => {
    try {
        const nuevaCita = await citaService.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(400).json({ 
            error: "No se pudo agendar la cita", 
            detalle: error.message 
        });
    }
};

// Actualizar una cita
exports.update = async (req, res) => {
    try {
        const citaActualizada = await citaService.update(req.params.id, req.body);
        if (!citaActualizada) return res.status(404).json({ error: "Cita no encontrada" });
        res.status(200).json(citaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cita" });
    }
};

// Eliminar una cita
exports.delete = async (req, res) => {
    try {
        const citaEliminada = await citaService.delete(req.params.id);
        if (!citaEliminada) return res.status(404).json({ error: "Cita no encontrada" });
        res.status(200).json({ mensaje: "Cita eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cita" });
    }
};