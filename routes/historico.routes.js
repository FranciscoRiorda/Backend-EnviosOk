/*
Historico: '/api/historico'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getHistorico, crearHistorico, actualizarHistorico, borrarHistorico } = require('../controllers/historico.controllers');


const router = Router();

//Obtener envio
router.get('/', getHistorico);

//Crear envio
router.post('/', [
    validarJWT,
    check('dineroDisponible', 'El dinero disponible es necesario').not().isEmpty(),
    validarCampos

], crearHistorico);

//Actualizar envio
router.put('/:id', [
        validarJWT,
        check('dineroDisponible', 'El dinero disponible es necesario').not().isEmpty(),
        validarCampos

    ],
    actualizarHistorico);


router.delete('/:id', validarJWT, borrarHistorico);

//Exportar ruta para usarlo en otros 
module.exports = router;