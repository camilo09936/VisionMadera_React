const express = require('express');
const router = express.Router();
const controller = require('../controllers/pago.controller');

router.get('/', controller.getAll);
router.get('/:id_pago', controller.getById);
router.post('/', controller.create);
router.put('/:id_pago', controller.update);
router.delete('/:id_pago', controller.delete);

module.exports = router;
