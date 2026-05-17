const sequelize= require('../config/db');
const Usuario= require('./usuario.model');
const EstadoCita= require('./estado_cita.model');
const Cita= require('./cita.model');
const Disenador= require('./disenador.model');
const Sede= require('./sede.model');
const Calificacion= require("./calificacion.model");
const EstadoPago = require('./estado_pago.model');
const MetodoPago = require('./metodo_pago.model');
const Pago = require('./pago.model');
const Pqrs = require('./pqrs.model');
const TipoPqrs= require('./tipo_pqrs.model');
const EstadoPqrs= require('./estado_pqrs.model');
const BloqueHorario= require("./bloque_horario.model");
const AgendaDiseñador= require('./agenda_disenador.model');

EstadoCita.hasMany(Cita,{foreignKey: 'id_estado_cita'});
Cita.belongsTo(EstadoCita,{foreignKey: 'id_estado_cita'});

Usuario.hasMany(Cita,{foreignKey: 'documento'});
Cita.belongsTo(Usuario,{foreignKey: 'documento'});

Disenador.hasMany(Cita,{foreignKey: 'id_disenador'});
Cita.belongsTo(Disenador,{foreignKey: 'id_disenador'});

Sede.hasMany(Disenador,{foreignKey: 'id_sede'});
Disenador.belongsTo(Sede,{foreignKey: 'id_sede'});

Sede.hasMany(Cita, {foreignKey: 'id_sede'});
Cita.belongsTo(Sede, {foreignKey: 'id_sede'});

Cita.hasOne(Calificacion, {foreignKey: 'id_cita'});
Calificacion.belongsTo(Cita, {foreignKey: 'id_cita'});

EstadoPago.hasMany(Pago, { foreignKey: 'id_estado_pago' });
Pago.belongsTo(EstadoPago, { foreignKey: 'id_estado_pago' });

MetodoPago.hasMany(Pago, { foreignKey: 'id_metodo_pago' });
Pago.belongsTo(MetodoPago, { foreignKey: 'id_metodo_pago' });

Cita.hasOne(Pago, { foreignKey: 'id_cita' });
Pago.belongsTo(Cita, { foreignKey: 'id_cita' });

Usuario.hasMany(Pqrs, {foreignKey: 'documento'});
Pqrs.belongsTo(Usuario, {foreignKey: 'documento'});

TipoPqrs.hasMany(Pqrs, {foreignKey: 'id_tipo_pqrs'});
Pqrs.belongsTo(TipoPqrs, {foreignKey: 'id_tipo_pqrs'});

EstadoPqrs.hasMany(Pqrs, {foreignKey: 'id_estado_pqrs'});
Pqrs.belongsTo(EstadoPqrs, {foreignKey: 'id_estado_pqrs'});

BloqueHorario.hasMany(Cita, {foreignKey: 'id_bloque'});
Cita.belongsTo(BloqueHorario, {foreignKey: "id_bloque"});

BloqueHorario.hasMany(AgendaDiseñador, {foreignKey: 'id_bloque'});
AgendaDiseñador.belongsTo(BloqueHorario, {foreignKey: 'id_bloque'});

Disenador.hasMany(AgendaDiseñador, {foreignKey: 'id_disenador'});
AgendaDiseñador.belongsTo(Disenador, {foreignKey: 'id_disenador'});

module.exports = {
    sequelize,
    Usuario,
    EstadoCita,
    Sede,
    Disenador,
    Cita,
    Calificacion,
    EstadoPago,
    MetodoPago,
    Pago,
    Pqrs,
    TipoPqrs,
    EstadoPqrs,
    BloqueHorario,
    AgendaDiseñador
};