const express= require('express');
const router= express.Router();
const controller= require('../controllers/estado_cita.controller');
router.get('/',                     controller.getAll);
router.get('/:id_estado_cita',      controller.getById);
router.post('/',                    controller.create);
router.put('/:id_estado_cita',      controller.update);
router.delete("/:id_estado_cita",   controller.delete);
module.exports = router;