/*
Gastos: '/api/gastos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getGastos,
    crearGasto,
    actualizarGasto,
    borrarGasto,
    getGastosPorFecha,
    getGastosTotales,
    getRendimientosPorFecha,
    getGastos2,
} = require('../controllers/gastos.controllers');


const router = Router();

//Obtener envio
router.get('/', getGastos);
router.get('/gastos2', getGastos2);
router.get('/gastosTotales', getGastosTotales);

//Reportes
router.get('/fecha/:fechaInicial/:fechaFinal', getGastosPorFecha);


//Crear envio
router.post('/', [
    validarJWT,
    check('fecha', 'La fecha del gasto es necesaria').not().isEmpty(),
    check('descripcion', 'La descripción del gastoe es necesaria').not().isEmpty(),
    check('importe', 'El importe gastado es necesario').not().isEmpty(),
    validarCampos

], crearGasto);

//Actualizar envio
router.put('/:id', [
        validarJWT,
        check('fecha', 'La fecha del gasto es necesaria').not().isEmpty(),
        check('descripcion', 'La descripción del gastoe es necesaria').not().isEmpty(),
        check('importe', 'El importe gastado es necesario').not().isEmpty(),
        validarCampos

    ],
    actualizarGasto);


router.delete('/:id', validarJWT, borrarGasto);



//Exportar ruta para usarlo en otros 
module.exports = router;