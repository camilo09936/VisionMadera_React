const { EstadoPago } = require('../models');

exports.getAll = async () => {
    return await EstadoPago.findAll();
};

exports.getById = async (id_estado_pago) => {
    return await EstadoPago.findByPk(id_estado_pago);
};

exports.create = async (data) => {
    return await EstadoPago.create(data);
};

exports.update = async (id_estado_pago, data) => {
    const estadoPago = await EstadoPago.findByPk(id_estado_pago);
    if (!estadoPago) return null;
    return await estadoPago.update(data);
};

exports.delete = async (id_estado_pago) => {
    const estadoPago = await EstadoPago.findByPk(id_estado_pago);
    if (!estadoPago) return null;
    return await estadoPago.destroy();
};
