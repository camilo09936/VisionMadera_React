const { json }=require('sequelize');
const service= require('../services/estado_cita.service');
exports.getAll=async(req,res)=>{
    try{
        const data= await service.getAll();
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.getById=async(req,res)=>{
    try{
        const data= await service.getById(req.params.id_estado_cita);
        if(!data){
            return res.status(404).json({error: 'Estado de cita no encontrado'});
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
            mensaje: 'Estado de cita creado',
            data: data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update=async(req,res)=>{
    try{
        const data= await service.update(req.params.id_estado_cita,req.body);
        if(!data){
            return res.status(404).json({mensaje: 'Estado de cita no encontrado'});
        }
        res.json({mensaje: 'Estado de cita actualizado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete=async(req,res)=>{
    try{
        const data= await service.delete(req.params.id_estado_cita);
        if(!data){
            return res.status(404).json({mensaje: 'Estado de cita no encontrado'});
        }
        res.json({mensaje: 'Estado de cita eliminado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};