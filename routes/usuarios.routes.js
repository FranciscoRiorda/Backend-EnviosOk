/*
Ruta: /api/usuarios
*/
const { Router } = require('express');

const router = Router();
//Obtener y crear usuarios
const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controllers');

router.get('/', getUsuarios);

router.post('/', crearUsuario);


//Exportar ruta para usarlo en otros 
module.exports = router;