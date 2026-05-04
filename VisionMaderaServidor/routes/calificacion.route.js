const express= require('express');
const router= express.Router();
const controller= require('../controllers/calificacion.controller');
router.get('/',                     controller.getAll);
router.get('/:id_calificacion',     controller.getById);
router.post('/',                    controller.create);
router.put('/:id_calificacion',     controller.update);
router.delete("/:id_calificacion",  controller.delete);
module.exports = router;