const { json }= require('sequelize');
const service= require('../services/disenador.service');
exports.getAll=async(req,res)=>{
    try{
        const data= await service.getAll();
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.getById= async(req,res)=>{
    try{
        const data= await service.getById(req.params.id_disenador);
        if(!data){
            return res.status(404).json({mensaje: 'Diseñador no encontrado'});
        }
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.create= async(req,res)=>{
    try{
    const data= await service.create(req.body);
    res.status(201).json({
        mensaje: 'Diseñador creado',
        data: data
    });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update= async(req,res)=>{
    try{
        const data= await service.update(req.params.id_disenador,req.body);
        if(!data){
            return res.status(404).json({mensaje: 'Diseñador no encontrado'});
        }
        res.json({mensaje: 'Diseñador actualizado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete= async(req,res)=>{
    try{
        const data= await service.delete(req.params.id_disenador);
        if (!data){
            return res.status(404).json({mensaje: 'Diseñador no encontrado'});
        }
        res.json({mensaje: 'Diseñador eliminado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};