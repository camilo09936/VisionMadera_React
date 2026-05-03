const { Usuario }= require('../models');
exports.getAll= async()=>{
    return await Usuario.findAll();
};
exports.getById= async(id_usuario)=>{
    return await Usuario.findByPk(id_usuario);
};
exports.create= async(data) => {
    return await Usuario.create(data);
};
exports.update= async(id_usuario,data) => {
    const usuario= await Usuario.findByPk(id_usuario);
    if(!usuario) return null;
    return await usuario.update(data);
};
exports.delete= async(id_usuario)=>{
    const usuario= await Usuario.findByPk(id_usuario);
    if(!usuario) return null;
    return await usuario.destroy();
};