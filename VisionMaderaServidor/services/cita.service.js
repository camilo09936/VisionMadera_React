const { Cita, EstadoCita, Usuario, Disenador }= require('../models');
exports.getAll= async()=>{
    return await Cita.findAll({
        include:[
            {model: EstadoCita, attributes: ['nombre']},
            {model: Usuario, attributes: ['nombre', 'apellido']},
            {model: Disenador, attributes: ['nombre', 'apellido']}
        ]
    });
};
exports.getById= async(id_cita)=>{
    return await Cita.findByPk(id_cita, {
        include: [
            {model: EstadoCita, attributes: ['nombre']}
        ]
    });
};
exports.create= async(data)=>{
    return await Cita.create(data);
};
exports.update= async(id_cita,data)=>{
    const cita= await Cita.findByPk(id_cita);
    if(!cita) return null;
    return await cita.update(data);
};
exports.delete= async(id_cita)=>{
    const cita= await Cita.findByPk( id_cita);
    if(!cita) return null;
    return await cita.destroy();
};