/*
Balance: '/api/balance'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {} = require('../controllers/registroEnvios.controllers');


const router = Router();



//Exportar ruta para usarlo en otros 
module.exports = router;