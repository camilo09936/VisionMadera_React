const sequelize= require('../config/db');
const Usuario= require('./usuario.model');
const EstadoCita= require('./estado_cita.model');
const Cita= require('./cita.model');
const Disenador= require('./disenador.model');
const Sede= require('./sede.model');
const EstadoPago = require('./estado_pago.model');
const MetodoPago = require('./metodo_pago.model');
const Pago = require('./pago.model');

EstadoCita.hasMany(Cita,{foreignKey: 'id_estado_cita'});
Cita.belongsTo(EstadoCita,{foreignKey: 'id_estado_cita'});

Usuario.hasMany(Cita,{foreignKey: 'id_usuario'});
Cita.belongsTo(Usuario,{foreignKey: 'id_usuario'});

Disenador.hasMany(Cita,{foreignKey: 'id_disenador'});
Cita.belongsTo(Disenador,{foreignKey: 'id_disenador'});

Sede.hasMany(Disenador,{foreignKey: 'id_sede'});
Disenador.belongsTo(Sede,{foreignKey: 'id_sede'});

Sede.hasMany(Cita, {foreignKey: 'id_sede'});
Cita.belongsTo(Sede, {foreignKey: 'id_sede'});

MetodoPago.hasMany(Pago, { foreignKey: 'id_metodo_pago' });
Pago.belongsTo(MetodoPago, { foreignKey: 'id_metodo_pago' });

EstadoPago.hasMany(Pago, { foreignKey: 'id_estado_pago' });
Pago.belongsTo(EstadoPago, { foreignKey: 'id_estado_pago' });

Cita.hasOne(Pago, { foreignKey: 'id_cita' });
Pago.belongsTo(Cita, { foreignKey: 'id_cita' });

module.exports = {
    sequelize,
    Usuario,
    EstadoCita,
    Cita,
    Disenador,
    Sede,
    EstadoPago,
    MetodoPago,
    Pago
};