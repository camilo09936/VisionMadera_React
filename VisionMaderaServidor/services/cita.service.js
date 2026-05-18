const Cita = require('../models/cita.model');
const { QueryTypes } = require('sequelize');

const BLOQUES={
    1: {inicio:8,  fin:10},
    2: {inicio:10, fin:12},
    3: {inicio:12, fin:14},
    4: {inicio:14, fin:16},
    5: {inicio:16, fin:18},
    6: {inicio:18, fin:20},
};

function construirFechaHoraCita(fecha, id_bloque){
    const bloque= BLOQUES[parseInt(id_bloque)];
    if (!bloque) return null;
    const [year, month, day]= fecha.split('-').map(Number);
    return new Date(year, month - 1, day, bloque.inicio,0,0);
}

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
            where: { fecha, id_disenador },
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

        const bloque= BLOQUES[parseInt(id_bloque)];
        if (!bloque) throw new Error("El bloque horario seleccionado no es válido.");

        //REGLA DE NEGOCIO 1: No se pueden agendar citas en el pasado
        const fechaHoraCita= construirFechaHoraCita(fecha, id_bloque);
        const ahora= new Date();
        if (fechaHoraCita<=ahora){
            throw new Error("No se puede agendar una cita en una fecha y hora que ya paso.");
        }

        //REGLA DE NEGOCIO 2: No se permiten citas luego de las 20:00
        if(bloque.inicio>=20){
            throw new Error("No se pueden agendar citas después de las 20:00");
        }
        // Usamos Cita.sequelize directo para evitar errores de importación 'undefined'
        await Cita.sequelize.query(
            `EXEC sp_AgendarCita ?, ?, ?, ?, ?, ?`,
            {
                replacements: [ fecha, id_bloque, id_estado_cita || 1, documento, id_sede, id_disenador],
                type: QueryTypes.RAW
            }
        );

        return { success: true, mensaje: "Cita registrada con éxito." };

    } catch (error) {
        console.error("Error en cita.service (create):", error.message);
        throw error; 
    }
};

// Actualizar (reprogramar) una cita
exports.update = async (id_cita, citaData) => {
    try {
        const cita = await Cita.findByPk(id_cita);
        if (!cita) return null;

        //REGLA DE NEGOCIO 1: No se puede reprogramar con menos de 2 horas de anticipacion.
        const fechaHoraActual= construirFechaHoraCita(
            cita.fecha instanceof Date
            ? cita.fecha.toISOString().split('T')[0]
            : String(cita.fecha).split("T")[0],
        cita.id_bloque
        );
        const ahora= new Date();
        const dosHorasEnMs= 2 * 60 * 60 * 1000;
        if (fechaHoraActual - ahora < dosHorasEnMs){
            throw new Error("No se puede reprogramar una cita con menos de 2 horas de anticipación.");
        }
        const nuevaFecha= citaData.fecha || cita.fecha;
        const nuevoBloque= citaData.id_bloque || cita.id_bloque;

        const bloque= BLOQUES[parseInt(nuevoBloque)];
        if(!bloque) throw new Error("El bloque horario nuevo no es válido");

        //REGLA DE NEGOCIO 2: La nueva fecha/ hora no puede ser en el pasado
        const nuevaFechaHora= construirFechaHoraCita(
            typeof nuevaFecha==='string' ? nuevaFecha.split('T')[0] : nuevaFecha,
            nuevoBloque
        );
        if(nuevaFechaHora<=ahora){
            throw new Error("No se puede reprogramar a una fecha y hora que ya pasaron.");
        }
        //REGLA DE NEGOCIO 3: No reagender luego de las 20:00
        if (bloque.inicio>=20){
            throw new Error("No se puede reprogramar citas a un horario después de las 20:00.");
        }
        await cita.update(citaData);
        return cita;
    } catch (error) {
        console.error("Error en cita.service (update):", error.message);
        throw error;
    }
};

// Eliminar una cita
exports.delete = async (id_cita) => {
    try {
        const cita = await Cita.findByPk(id_cita);
        if (!cita) return null;

        //REGLA DE NEGOCIO 1: No se puede cancelar una cita con menos de 2 horas de anticipacion
        const fechaHoraCita= construirFechaHoraCita(
            cita.fecha instanceof Date
            ? cita.fecha.toISOString().split('T')[0]
            : String(cita.fecha).split('T')[0],
        cita.id_bloque
        );
        const ahora= new Date();
        const dosHorasEnMs= 2 * 60 * 60 * 1000;
        if (fechaHoraCita - ahora < dosHorasEnMs){
            throw new Error("No se puede cancelar una cita con menos de 2 horas de anticipación");
        }
        await cita.destroy();
        return cita;
    } catch (error) {
        console.error("Error en cita.service (delete):", error.message);
        throw error;
    }
};