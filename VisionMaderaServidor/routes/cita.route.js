const express= require('express');
const router= express.Router();
const controller= require('../controllers/cita.controller');
router.get('/',             controller.getAll);
router.get('/:id_cita',     controller.getById);
router.post('/',            controller.create);
router.put('/:id_cita',     controller.update);
router.delete('/:id_cita',  controller.delete);
module.exports = router;