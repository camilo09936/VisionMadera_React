const { MetodoPago } = require('../models');

exports.getAll = async () => {
    return await MetodoPago.findAll();
};

exports.getById = async (id_metodo_pago) => {
    return await MetodoPago.findByPk(id_metodo_pago);
};

exports.create = async (data) => {
    return await MetodoPago.create(data);
};

exports.update = async (id_metodo_pago, data) => {
    const metodoPago = await MetodoPago.findByPk(id_metodo_pago);
    if (!metodoPago) return null;
    return await metodoPago.update(data);
};

exports.delete = async (id_metodo_pago) => {
    const metodoPago = await MetodoPago.findByPk(id_metodo_pago);
    if (!metodoPago) return null;
    return await metodoPago.destroy();
};
