const express= require('express');
const router= express.Router();
const controller= require('../controllers/pqrs.controller');
router.get('/',             controller.getAll);
router.get('/:id_pqrs',     controller.getById);
router.post("/",            controller.create);
router.put('/:id_pqrs',     controller.update);
router.delete("/:id_pqrs",  controller.delete);
module.exports = router;