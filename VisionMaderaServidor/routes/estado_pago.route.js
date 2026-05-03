const express = require('express');
const router = express.Router();
const controller = require('../controllers/estado_pago.controller');

router.get('/', controller.getAll);
router.get('/:id_estado_pago', controller.getById);
router.post('/', controller.create);
router.put('/:id_estado_pago', controller.update);
router.delete('/:id_estado_pago', controller.delete);

module.exports = router;
