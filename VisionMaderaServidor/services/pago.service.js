const { Pago } = require('../models');

exports.getAll = async () => {
    return await Pago.findAll();
};

exports.getById = async (id_pago) => {
    return await Pago.findByPk(id_pago);
};

exports.create = async (data) => {
    return await Pago.create({
        monto: data.monto,
        id_metodo_pago: data.id_metodo_pago,
        id_estado_pago: data.id_estado_pago,
        id_cita: data.id_cita
    });
};

exports.update = async (id_pago, data) => {
    const pago = await Pago.findByPk(id_pago);
    if (!pago) return null;
    return await pago.update(data);
};

exports.delete = async (id_pago) => {
    const pago = await Pago.findByPk(id_pago);
    if (!pago) return null;
    return await pago.destroy();
};
