const { BloqueHorario }= require('../models');

exports.getAll= async () => {
    return await BloqueHorario.findAll();
};

exports.getById= async (id_bloque) => {
    return await BloqueHorario.findByPk(id_bloque);
};