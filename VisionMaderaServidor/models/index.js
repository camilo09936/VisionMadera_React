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
Cita.belongsTo(EstadoCita,{foreignKey: 'id_estado_cita', onDelete: 'NO ACTION'});

Usuario.hasMany(Cita,{foreignKey: 'documento'});
Cita.belongsTo(Usuario,{foreignKey: 'documento', onDelete: 'CASCADE'});

Disenador.hasMany(Cita,{foreignKey: 'id_disenador'});
Cita.belongsTo(Disenador,{foreignKey: 'id_disenador', onDelete: 'NO ACTION'});

Sede.hasMany(Disenador,{foreignKey: 'id_sede'});
Disenador.belongsTo(Sede,{foreignKey: 'id_sede', onDelete: 'NO ACTION'});

Sede.hasMany(Cita, {foreignKey: 'id_sede'});
Cita.belongsTo(Sede, {foreignKey: 'id_sede', onDelete: 'NO ACTION'});

Cita.hasOne(Calificacion, {foreignKey: 'id_cita'});
Calificacion.belongsTo(Cita, {foreignKey: 'id_cita', onDelete: 'NO ACTION'});

EstadoPago.hasMany(Pago, { foreignKey: 'id_estado_pago' });
Pago.belongsTo(EstadoPago, { foreignKey: 'id_estado_pago', onDelete: 'NO ACTION'});

MetodoPago.hasMany(Pago, { foreignKey: 'id_metodo_pago' });
Pago.belongsTo(MetodoPago, { foreignKey: 'id_metodo_pago', onDelete: 'NO ACTION'});

Cita.hasOne(Pago, { foreignKey: 'id_cita' });
Pago.belongsTo(Cita, { foreignKey: 'id_cita', onDelete: 'CASCADE'});

Usuario.hasMany(Pqrs, {foreignKey: 'documento'});
Pqrs.belongsTo(Usuario, {foreignKey: 'documento', onDelete: 'CASCADE'});

TipoPqrs.hasMany(Pqrs, {foreignKey: 'id_tipo_pqrs'});
Pqrs.belongsTo(TipoPqrs, {foreignKey: 'id_tipo_pqrs', onDelete: 'NO ACTION'});

EstadoPqrs.hasMany(Pqrs, {foreignKey: 'id_estado_pqrs'});
Pqrs.belongsTo(EstadoPqrs, {foreignKey: 'id_estado_pqrs', onDelete: 'NO ACTION'});

BloqueHorario.hasMany(Cita, {foreignKey: 'id_bloque'});
Cita.belongsTo(BloqueHorario, {foreignKey: "id_bloque", onDelete: 'NO ACTION'});

BloqueHorario.hasMany(AgendaDiseñador, {foreignKey: 'id_bloque'});
AgendaDiseñador.belongsTo(BloqueHorario, {foreignKey: 'id_bloque', onDelete: 'NO ACTION'});

Disenador.hasMany(AgendaDiseñador, {foreignKey: 'id_disenador'});
AgendaDiseñador.belongsTo(Disenador, {foreignKey: 'id_disenador', onDelete: 'CASCADE' });

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