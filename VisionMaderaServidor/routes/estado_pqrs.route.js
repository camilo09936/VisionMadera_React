const express= require('express');
const router= express.Router();
const controller= require('../controllers/estado_pqrs.controller');
router.get('/',                     controller.getAll);
router.get('/:id_estado_pqrs',      controller.getById);
/*router.post('/',                    controller.create);
router.put('/:id_estado_pqrs',      controller.update);
router.delete('/:id_estado_pqrs',   controller.delete);*/
module.exports = router;