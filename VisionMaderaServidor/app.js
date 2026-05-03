require('dotenv').config();
const express= require('express');
const app = express();
app.use(express.json());
const { sequelize } = require('./models');
sequelize.sync().then(()=>console.log('DB Conectada'))
const routesUsuario= require('./routes/usuario.route');
const routesCita= require('./routes/cita.route');
const routesEstadoCita= require('./routes/estado_cita.route');
const routesDisenador= require('./routes/disenador.route');
const routersSede= require('./routes/sede.route');
const estadoPagoRoute = require('./routes/estado_pago.route');
const metodoPagoRoute = require('./routes/metodo_pago.route');
const pagoRoute = require('./routes/pago.route');
app.use('/Usuarios',routesUsuario);
app.use('/Cita',routesCita);
app.use('/EstadoCita',routesEstadoCita);
app.use('/Disenador',routesDisenador);
app.use('/Sede',routersSede);
app.use('/EstadoPago', estadoPagoRoute);
app.use('/MetodoPago', metodoPagoRoute);
app.use('/Pago', pagoRoute);
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});