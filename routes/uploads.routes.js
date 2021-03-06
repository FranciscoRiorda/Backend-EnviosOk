/*
Busquedas: '/api/uploads/'
*/

const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { cargarArchivo, retornaImagen } = require('../controllers/uploads.controller');


const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, cargarArchivo);
router.get('/:tipo/:img', retornaImagen);


module.exports = router;