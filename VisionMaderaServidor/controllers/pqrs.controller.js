const { json }= require('sequelize');
const service= require('../services/pqrs.service');
exports.getAll= async(req,res) => {
    try{
        const data= await service.getAll();
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.getById= async(req,res) => {
    try{
        const data= await service.getById(req.params.id_pqrs);
        if(!data){
            return res.status(404).json({mensaje: 'PQRS no encontrada'});
        }
        res.json(data);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.create= async(req,res) => {
    try{
        const data= await service.create(req.body);
        res.status(201).json({
            mensaje: 'PQRS Creada',
            data: data
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.update= async(req,res)=>{
    try{
        const data= await service.update(req.params.id_pqrs, req.body);
        if(!data){
            return res.status(404).json({mensaje: 'PQRS no encontrada'});
        }
        res.json({mensaje: 'PQRS actualizada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.delete= async(req,res)=>{
    try{
        const data= await service.delete(req.params.id_pqrs);
        if(!data){
            return res.status(404).json({message: 'PQRS no encontrada'})
        }
        res.json({mensaje: 'PQRS eliminada'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};