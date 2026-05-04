const { TipoPqrs }= require('../models');
exports.getAll= async ()=>{
    return await TipoPqrs.findAll();
};
exports.getById= async (id_tipo_pqrs)=>{
    return await TipoPqrs.findByPk(id_tipo_pqrs);
};
exports.create= async (data)=>{
    return await TipoPqrs.create(data);
};
exports.update= async (id_tipo_pqrs,data)=>{
    const tipo= await TipoPqrs.findByPk(id_tipo_pqrs);
    if(!tipo) return null;
    return await tipo.update(data);
};
exports.delete= async (id_tipo_pqrs)=>{
    const tipo= await TipoPqrs.findByPk(id_tipo_pqrs);
    if(!tipo) return null;
    return await tipo.destroy();
};