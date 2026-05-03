const { Disenador }= require('../models');
exports.getAll=async() => {
    return await Disenador.findAll();
};
exports.getById= async (id_disenador) => {
    return await Disenador.findByPk(id_disenador);
};
exports.create= async(data) => {
    return await Disenador.create(data);
};
exports.update= async(id_disenador,data) => {
    const disenador = await Disenador.findByPk(id_disenador);
    if(!disenador) return null;
    return await disenador.update(data);
};
exports.delete= async(id_disenador)=>{
    const disenador = await Disenador.findByPk(id_disenador);
    if(!disenador) return null;
    return await disenador.destroy();
};