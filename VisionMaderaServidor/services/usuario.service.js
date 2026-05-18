const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../middlewares/tokens');

exports.getAll = async () => {
    return await Usuario.findAll();
};

exports.getById = async (documento) => {
    return await Usuario.findByPk(documento);
};

exports.create = async (data) => {
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
    return await Usuario.create(data);
};

exports.update = async (documento, data) => {
    const usuario = await Usuario.findByPk(documento);
    if (!usuario) return null;
    if (data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }
    return await usuario.update(data);
};

exports.delete = async (documento) => {
    const usuario = await Usuario.findByPk(documento);
    if (!usuario) return null;
    return await usuario.destroy();
};

exports.login = async (correo, contrasena) => {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return null;
    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValida) return null;
    const token = generarToken(usuario);
    return { token, usuario };
};

