const { Sede }= require('../models');
exports.getAll= async() => {
    return await Sede.findAll();
};
exports.getById= async(id_sede)=>{
    return await Sede.findByPk(id_sede);
};
exports.create= async(data) => {
    return await Sede.create(data);
};
exports.update= async(id_sede,data) => {
    const sede= await Sede.findByPk(id_sede);
    if(!sede) return null;
    return await sede.update(data);
};
exports.delete= async(id_sede)=>{
    const sede= await Sede.findByPk(id_sede);
    if(!sede) return null;
    return await sede.destroy();
};