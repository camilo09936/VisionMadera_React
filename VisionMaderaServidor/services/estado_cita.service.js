const { EstadoCita }= require('../models');
exports.getAll= async() => {
    return await EstadoCita.findAll();
};
exports.getById= async(id_estado_cita)=>{
    return await EstadoCita.findByPk(id_estado_cita);
};
exports.create= async(data)=>{
    return await EstadoCita.create(data);
};
exports.update= async(id_estado_cita, data)=>{
    const estado= await EstadoCita.findByPk(id_estado_cita);
    if(!estado) return null;
    return await estado.update(data);
};
exports.delete= async(id_estado_cita)=>{
    const estado= await EstadoCita.findByPk(id_estado_cita);
    if(!estado) return null;
    return await estado.destroy();
};