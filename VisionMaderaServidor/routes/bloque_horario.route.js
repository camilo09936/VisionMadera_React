const express= require('express');
const router= express.Router();
const bloqueController= require('../controllers/bloque_horario.controller');
router.get('/',     bloqueController.getAll);
router.get('/',     bloqueController.getById);
module.exports= router;