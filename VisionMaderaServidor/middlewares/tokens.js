const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'clave_secreta';

const generarToken = (usuario) => {
    return jwt.sign(
        { documento: usuario.documento, correo: usuario.correo },
        SECRET,
        { expiresIn: '15m' }
    );
};

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = { generarToken, verificarToken };