/*
Busquedas: '/api/todo/'
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getColeccion } = require('../controllers/busquedas.controllers');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getColeccion);


module.exports = router;