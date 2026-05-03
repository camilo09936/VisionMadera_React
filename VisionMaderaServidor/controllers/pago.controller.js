const service = require('../services/pago.service');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await service.getById(req.params.id_pago);
        if (!data) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await service.create(req.body);
        res.status(201).json({
            mensaje: 'Pago creado',
            data: data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await service.update(req.params.id_pago, req.body);
        if (!data) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }
        res.json({ mensaje: 'Pago actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await service.delete(req.params.id_pago);
        if (!data) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }
        res.json({ mensaje: 'Pago eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
