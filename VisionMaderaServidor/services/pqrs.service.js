const { Pqrs, Usuario }= require('../models');
exports.getAll= async() => {
    return await Pqrs.findAll({
        include:[
            {model: Usuario, attributes: ['nombre', 'apellido', 'correo']}
        ]
    });
};
exports.getById= async(id_pqrs) => {
    return await Pqrs.findByPk(id_pqrs, {
        include:[
            {model: Usuario, attributes: ['nombre', 'apellido', 'correo']}
        ]
    });
};
exports.create= async(data) => {
    return await Pqrs.create(data);
};
exports.update= async(id_pqrs,data) => {
    const pqrs= await Pqrs.findByPk(id_pqrs);
    if(!pqrs) return null;
    return await pqrs.update(data);
};
exports.delete= async(id_pqrs) => {
    const pqrs= await Pqrs.findByPk(id_pqrs);
    if(!pqrs) return null;
    return await pqrs.destroy();
};