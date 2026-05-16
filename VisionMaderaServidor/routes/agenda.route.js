const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agenda.controller');

router.get('/', agendaController.getHorariosDisponibles);

module.exports = router;