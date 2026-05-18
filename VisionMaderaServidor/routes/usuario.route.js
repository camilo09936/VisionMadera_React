const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const { verificarToken } = require('../middlewares/tokens');

// Rutas públicas
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    const service = require('../services/usuario.service');
    const resultado = await service.login(correo, contrasena);
    if (!resultado) {
        return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }
    res.json({ token: resultado.token, usuario: resultado.usuario });
});

router.post('/', controller.create);

// Rutas protegidas
router.get('/', verificarToken, controller.getAll);
router.get('/:id_usuario', verificarToken, controller.getById);
router.put('/:id_usuario', verificarToken, controller.update);
router.delete('/:id_usuario', verificarToken, controller.delete);

module.exports = router;