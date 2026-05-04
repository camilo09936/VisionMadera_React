const express= require('express');
const router= express.Router();
const controller= require('../controllers/tipo_pqrs.controller');
router.get('/',                     controller.getAll);
router.get('/:id_tipo_pqrs',        controller.getById);
router.post('/',                    controller.create);
router.put('/:id_tipo_pqrs',        controller.update);
router.delete('/:id_tipo_pqrs',     controller.delete);
module.exports = router;