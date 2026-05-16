require('dotenv').config();
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// CORRECCIÓN AQUÍ: Importamos la instancia de conexión directa
const sequelize = require('./config/db');
sequelize.sync().then(() => console.log('DB Conectada'));

// Importación de rutas existentes
const routesUsuario = require('./routes/usuario.route');
const routesCita = require('./routes/cita.route');
const routesEstadoCita = require('./routes/estado_cita.route');
const routesDisenador = require('./routes/disenador.route');
const routesSede = require('./routes/sede.route');
const routesEstadoPago = require('./routes/estado_pago.route');
const routesMetodoPago = require('./routes/metodo_pago.route');
const routesPago = require('./routes/pago.route');
const routesCalificacion = require('./routes/calificacion.route');
const routesPQRS = require('./routes/pqrs.route');
const routesTipoPqrs = require('./routes/tipo_pqrs.route');
const routesEstadoPqrs = require('./routes/estado_pqrs.route');

// NUEVA RUTA: Importación de la ruta de Agenda
const routesAgendaDisenador = require('./routes/agenda.route');

// Declaración de endpoints existentes
app.use('/Usuarios', routesUsuario);
app.use('/Cita', routesCita);
app.use('/EstadoCita', routesEstadoCita);
app.use('/Disenador', routesDisenador);
app.use('/Sede', routesSede);
app.use('/EstadoPago', routesEstadoPago);
app.use('/MetodoPago', routesMetodoPago);
app.use('/Pago', routesPago);
app.use('/Calificacion', routesCalificacion);
app.use('/PQRS', routesPQRS);
app.use('/TipoPqrs', routesTipoPqrs);
app.use('/EstadoPqrs', routesEstadoPqrs);

// NUEVO ENDPOINT: Vinculación de la ruta AgendaDisenador
app.use('/AgendaDisenador', routesAgendaDisenador);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});