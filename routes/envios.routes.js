/*
Envios: '/api/envios'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getEnvios, crearEnvio, actualizarEnvio, borrarEnvio } = require('../controllers/envios.controllers');


const router = Router();

//Obtener envio
router.get('/', getEnvios);

//Crear envio
router.post('/', [
    validarJWT,
    check('fechaEnvio', 'La fecha de envío es necesaria').not().isEmpty(),
    check('numDeEnvio', 'El número de envío es necesario').not().isEmpty(),
    check('nombreCliente', 'El nombre del cliente es necesario').not().isEmpty(),
    check('costoEnvio', 'El costo de envío es necesario').not().isEmpty(),
    validarCampos

], crearEnvio);

//Actualizar envio
router.put('/:id', [

    ],
    actualizarEnvio);


router.delete('/:id', borrarEnvio);

//Exportar ruta para usarlo en otros 
module.exports = router;