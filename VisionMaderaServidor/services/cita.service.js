const Cita = require('../models/cita.model');
const { QueryTypes } = require('sequelize');

// Obtener todas las citas
exports.getAll = async () => {
    try {
        return await Cita.findAll();
    } catch (error) {
        console.error("Error en cita.service (getAll):", error);
        throw error;
    }
};

// Obtener cita por ID
exports.getById = async (id_cita) => {
    try {
        return await Cita.findByPk(id_cita);
    } catch (error) {
        console.error("Error en cita.service (getById):", error);
        throw error;
    }
};

//Buscar bloques reservados de manera segura usando Sequelize nativo
exports.getBloquesOcupados = async (fecha, id_disenador) => {
    try {
        const citasOcupadas = await Cita.findAll({
            where: {
                fecha: fecha,
                id_disenador: id_disenador
            },
            attributes: ['id_bloque']
        });

        // Retorna un arreglo simple limpio de números, ejemplo: [2, 4]
        return citasOcupadas.map(cita => parseInt(cita.id_bloque));
    } catch (error) {
        console.error("Error en cita.service (getBloquesOcupados):", error);
        throw error;
    }
};

// Crear una nueva cita (Usando de forma segura tu Procedimiento Almacenado)
exports.create = async (citaData) => {
    try {
        const { fecha, id_bloque, id_estado_cita, documento, id_sede, id_disenador } = citaData;

        // Usamos Cita.sequelize directo para evitar errores de importación 'undefined'
        await Cita.sequelize.query(
            `EXEC sp_AgendarCita ?, ?, ?, ?, ?, ?`,
            {
                replacements: [ 
                    fecha, 
                    id_bloque, 
                    id_estado_cita || 1, 
                    documento, 
                    id_sede, 
                    id_disenador 
                ],
                type: QueryTypes.RAW
            }
        );

        return { success: true, mensaje: "Cita registrada con éxito mediante procedimiento." };

    } catch (error) {
        console.error("Error en el procedimiento almacenado (create):", error.message);
        throw error; 
    }
};

// Actualizar una cita
exports.update = async (id_cita, citaData) => {
    try {
        const cita = await Cita.findByPk(id_cita);
        if (!cita) return null;
        await cita.update(citaData);
        return cita;
    } catch (error) {
        console.error("Error en cita.service (update):", error);
        throw error;
    }
};

// Eliminar una cita
exports.delete = async (id_cita) => {
    try {
        const cita = await Cita.findByPk(id_cita);
        if (!cita) return null;
        await cita.destroy();
        return cita;
    } catch (error) {
        console.error("Error en cita.service (delete):", error);
        throw error;
    }
};