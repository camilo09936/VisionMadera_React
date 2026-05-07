const { Sequelize }= require('sequelize');
const DB_TYPE= process.env.DB_TYPE || 'mysql';
let sequelize;
if(DB_TYPE==='mysql'){
    sequelize= new Sequelize('VisionMadera','root','1001015565Sc.',{
        host: 'localhost',
        dialect: 'mysql'
    });
}
if (DB_TYPE === "mssql") {
    sequelize = new Sequelize('VisionMadera','sa','1001015565Sc.',{
        host: 'localhost',
        port: 1433,
        dialect: 'mssql',
        dialectOptions:{
            options:{
                encrypt: false,
                trustServerCertificate: true
            }
        }
    });
}
module.exports=sequelize;