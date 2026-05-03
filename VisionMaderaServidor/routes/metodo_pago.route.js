const express = require('express');
const router = express.Router();
const controller = require('../controllers/metodo_pago.controller');

router.get('/', controller.getAll);
router.get('/:id_metodo_pago', controller.getById);
router.post('/', controller.create);
router.put('/:id_metodo_pago', controller.update);
router.delete('/:id_metodo_pago', controller.delete);

module.exports = router;
