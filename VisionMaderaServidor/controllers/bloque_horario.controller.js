const bloqueService= require('../services/bloque_horario.service');

exports.getAll= async (req, res)=>{
    try{
        const bloques= await bloqueService.getAll();
        res.status(200).json(bloques);
    }catch (error){
        res.status(500).json({error: "Error al obtener los bloques horarios"});
    }
};

exports.getById= async (req, res)=>{
    try{
        const bloque= await bloqueService.getById(req.params.id);
        if (!bloque) return res.status(404).json({error: "Bloque horario no encontrado"});
        res.status(200).json(bloque);
    }catch(error){
        res.status(500).json({error: "Error al buscar el bloque horario"});
    }
};