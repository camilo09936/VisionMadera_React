const { json }= require('sequelize');
const service= require('../services/cita.service');
exports.getAll= async (req,res)=>{
    try{
        const data= await service.getAll();
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.getById= async (req,res)=>{
    try{
        const data= await service.getById(req.params.id_cita);
        if(!data){
            return res.status(404).json({error: 'Cita no encontrada'});
        }
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.create= async (req,res)=>{
    try{
        const data= await service.create(req.body);
        res.status(201).json({
            mensaje: 'Cita creada',
            data: data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update= async (req,res)=>{
    try{
        const data= await service.update(req.params.id_cita, req.body);
        if(!data){
            return res.status(404).json({mensaje: 'Cita no encontrada'});
        }
        res.json({mensaje: 'Cita actualizada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete= async (req,res)=>{
    try{
        const data= await service.delete(req.params.id_cita);
        if(!data){
            return res.status(404).json({mensaje: 'Cita no encontrada'});
        }
        res.json({mensaje: 'Cita eliminada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};