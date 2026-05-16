const { EstadoPqrs }= require('../models');
exports.getAll= async() => {
    return await EstadoPqrs.findAll();
};
exports.getById= async(id_estado_pqrs)=>{
    return await EstadoPqrs.findByPk(id_estado_pqrs);
};
/*exports.create= async(data) => {
    return await EstadoPqrs.create(data);
};
exports.update= async(id_estado_pqrs,data) => {
    const estado= await EstadoPqrs.findByPk(id_estado_pqrs);
    if(!estado) return null;
    return await estado.update(data);
};
exports.delete= async(id_estado_pqrs)=>{
    const estado= await EstadoPqrs.findByPk(id_estado_pqrs);
    if(!estado) return null;
    return await estado.destroy();
};*/