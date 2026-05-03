const express= require('express');
const router= express.Router();
const controller= require('../controllers/sede.controller');
router.get('/',             controller.getAll);
router.get('/:id_sede',     controller.getById);
router.post('/',            controller.create);
router.put('/:id_sede',     controller.update);
router.delete("/:id_sede",  controller.delete);
module.exports = router;