/*
Balance: '/api/balance'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getBalance, crearBalance, actualizarBalance, borrarBalance } = require('../controllers/balance.controllers');


const router = Router();

//Obtener envio
router.get('/', getBalance);

//Crear envio
router.post('/', [
    validarJWT,
    check('mesAño', 'El mes y año son necesarios').not().isEmpty(),
    check('gastoMes', 'El gasto mensual es necesario').not().isEmpty(),
    check('ingresoMes', 'El ingreso mensual es necesario').not().isEmpty(),
    check('ganancia', 'La ganancia es necesaria').not().isEmpty(),
    check('sueldosMes', 'El total de sueldos mensuales es necesario').not().isEmpty(),
    check('pozoInicial', 'El pozo inicial del mes es necesario').not().isEmpty(),
    check('pozoFinal', 'El pozo final del mes es necesario').not().isEmpty(),
    check('cierreMes', 'El estado del mes es necesario').not().isEmpty(),
    validarCampos

], crearBalance);

//Actualizar envio
router.put('/:id', [

    ],
    actualizarBalance);


router.delete('/:id', borrarBalance);

//Exportar ruta para usarlo en otros 
module.exports = router;