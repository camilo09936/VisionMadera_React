const { json } = require('sequelize');
const service= require('../services/usuario.service');
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
        const data= await service.getById(req.params.documento);
        if(!data){
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
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
            mensaje: 'Usuario creado',
            data: data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update= async (req,res)=>{
    try{
        const data= await service.update(req.params.documento, req.body);
        if(!data){
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
        res.json({mensaje: 'Usuario actualizado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete= async (req,res)=>{
    try{
        const data= await service.delete(req.params.documento);
        if(!data){
            return res.status(404).json({mensaje: 'Usuario no encontrado'})
        }   
        res.json({mensaje: 'Usuario eliminado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};