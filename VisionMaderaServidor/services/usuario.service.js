const { Usuario }= require('../models');
exports.getAll= async()=>{
    return await Usuario.findAll();
};
exports.getById= async(documento)=>{
    return await Usuario.findByPk(documento);
};
exports.create= async(data) => {
    return await Usuario.create(data);
};
exports.update= async(documento,data) => {
    const usuario= await Usuario.findByPk(documento);
    if(!usuario) return null;
    return await usuario.update(data);
};
exports.delete= async(documento)=>{
    const usuario= await Usuario.findByPk(documento);
    if(!usuario) return null;
    return await usuario.destroy();
};