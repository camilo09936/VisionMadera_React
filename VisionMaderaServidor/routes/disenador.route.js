const express= require('express');
const router= express.Router();
const controller= require('../controllers/disenador.controller');
router.get('/',controller.getAll);
router.get('/:id_disenador',controller.getById);
router.post("/",controller.create);
router.put("/:id_disenador",controller.update);
router.delete('/:id_disenador',controller.delete);
module.exports = router;