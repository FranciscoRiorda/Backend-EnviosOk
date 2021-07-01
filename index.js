//Requerido para conectar con la cadena de conexión de la BD que se encuentra en .env
require('dotenv').config();

const express = require('express');
const cors = require('./database/config');

const { dbConnection } = require('./database/config');

const app = express();

// app.use(cors());

//Lectura y parseo del body
app.use(express.json());

dbConnection();

//Rutas

app.use('/api/usuarios', require('./routes/usuarios.routes'));

//Puerto donde corre el proyecto
app.listen(process.env.PORT, () => {
    console.log(('Servidor corriendo en puerto ' + process.env.PORT));
})

//Usuario mongo atlas franr - OdpXhG5UWoJubJC9