const { json }= require('sequelize');
const service= require('../services/sede.service');
exports.getAll= async(req,res)=>{
    try{
        const data= await service.getAll();
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.getById= async(req,res)=>{
    try{
        const data= await service.getById(req.params.id_sede);
        if(!data){
            return res.status(404).json({error: 'Sede no encontrada'});
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
            mensaje: 'Sede creada',
            data: data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update= async(req,res)=>{
    try{
        const data= await service.update(req.params.id_sede, req.body);
        if(!data){
            return res.status(404).json({mensaje: 'Sede no encontrada'});
        }
        res.json({mensaje: 'Sede actualizada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete= async(req,res)=>{
    try{
        const data= await service.delete(req.params.id_sede);
        if(!data){
            return res.status(404).json({mensaje: 'Sede no encontrada'});
        }
        res.json({mensaje: 'Sede eliminada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};