require('dotenv').config();
const express= require('express');
const app = express();
app.use(express.json());
const routes= require('./routes/usuario.route');
app.use('/Usuarios',routes);
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});