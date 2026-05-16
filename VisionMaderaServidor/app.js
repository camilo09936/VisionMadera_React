require('dotenv').config();
const express= require('express');
const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
const { sequelize } = require('./models');
sequelize.sync().then(()=>console.log('DB Conectada'))
const routesUsuario= require('./routes/usuario.route');
const routesCita= require('./routes/cita.route');
const routesEstadoCita= require('./routes/estado_cita.route');
const routesDisenador= require('./routes/disenador.route');
const routesSede= require('./routes/sede.route');
const routesEstadoPago = require('./routes/estado_pago.route');
const routesMetodoPago = require('./routes/metodo_pago.route');
const routesPago = require('./routes/pago.route');
const routesCalificacion= require('./routes/calificacion.route');
const routesPqrs= require('./routes/pqrs.route');
const routesTipoPqrs= require('./routes/tipo_pqrs.route');
const routesEstadoPqrs= require('./routes/estado_pqrs.route');
app.use('/Usuarios',routesUsuario);
app.use('/Cita',routesCita);
app.use('/EstadoCita',routesEstadoCita);
app.use('/Disenador',routesDisenador);
app.use('/Sede', routesSede);
app.use('/EstadoPago', routesEstadoPago);
app.use('/MetodoPago', routesMetodoPago);
app.use('/Pago', routesPago);
app.use('/Calificacion', routesCalificacion);
app.use('/PQRS', routesPqrs);
app.use('/TipoPqrs', routesTipoPqrs);
app.use('/EstadoPqrs', routesEstadoPqrs);
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});