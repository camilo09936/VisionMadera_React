const { Calificacion, Cita }= require('../models');
exports.getAll=async() => {
    return await Calificacion.findAll({
        include:[{model: Cita}]
    });
};
exports.getById= async(id_calificacion) => {
    return await Calificacion.findByPk(id_calificacion, {
        include:[{model: Cita}]
    });
};
exports.create= async(data) => {
    return await Calificacion.create({
        puntaje: data.puntaje,
        comentario: data.comentario,
        id_cita: data.id_cita
    });
};
exports.update= async(id_calificacion,data)=>{
    const calificacion=  await Calificacion.findByPk(id_calificacion);
    if(!calificacion) return null;
    return await calificacion.update(data);
};
exports.delete= async(id_calificacion)=> {
    const calificacion= await Calificacion.findByPk(id_calificacion);
    if(!calificacion) return null;
    return await calificacion.destroy();
};