//Requerido para conectar con la cadena de conexión de la BD que se encuentra en .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

//Lectura y parseo del body
app.use(express.json());

dbConnection();

app.use(express.static('public'));

//Rutas

app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/envios2', require('./routes/envios2.routes'));
app.use('/api/gastos', require('./routes/gastos.routes'));
app.use('/api/registroEnvios', require('./routes/registroEnvios.routes'));
app.use('/api/registroGastos', require('./routes/registroGastos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/login', require('./routes/auth.routes.js'));
app.use('/api/uploads', require('./routes/uploads.routes'));


//Puerto donde corre el proyecto
app.listen(process.env.PORT, () => {
    console.log(('Servidor corriendo en puerto ' + process.env.PORT));
});

//Usuario mongo atlas franr - Ou9NE0yQc5p13elN