/*
Pedidos: '/api/pedidos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getPedidos, crearPedido, actualizarPedido, borrarPedido, getPedidosById } = require('../controllers/pedidos.controllers');


const router = Router();

//Obtener pedido
router.get('/', validarJWT, getPedidos);

//Crear pedido
router.post('/', [
    validarJWT,
    check('nombreCliente', 'El nombre del cliente es necesario').not().isEmpty(),
    check('diaRetiro', 'El día de retiro del paquete es necesario').not().isEmpty(),
    check('domicilioRetiro', 'El domicilio de retiro del paquete es necesario').not().isEmpty(),
    check('telEntregaPaq', 'El teléfono de quien entrega el paquete es necesario').not().isEmpty(),
    check('estadoRetiro', 'El estado del retiro es necesario').not().isEmpty(),
    check('diaEntrega', 'El estado de entrega es necesario').not().isEmpty(),
    check('domicilioEntrega', 'El domicilio de entrega es necesario').not().isEmpty(),
    check('telRecibePaq', 'El teléfono de quien recibe el paquete es necesario').not().isEmpty(),
    check('mailCliente', 'El correo del cliente es necesario').not().isEmpty(),
    check('costoEnvio', 'El costo del envío es necesario').not().isEmpty(),
    validarCampos

], crearPedido);

//Actualizar pedido
router.put('/:id', [
        validarJWT,
        check('nombreCliente', 'El nombre del cliente es necesario').not().isEmpty(),
        check('diaRetiro', 'El día de retiro del paquete es necesario').not().isEmpty(),
        check('domicilioRetiro', 'El domicilio de retiro del paquete es necesario').not().isEmpty(),
        check('telEntregaPaq', 'El teléfono de quien entrega el paquete es necesario').not().isEmpty(),
        check('estadoRetiro', 'El estado del retiro es necesario').not().isEmpty(),
        check('diaEntrega', 'El estado de entrega es necesario').not().isEmpty(),
        check('domicilioEntrega', 'El domicilio de entrega es necesario').not().isEmpty(),
        check('telRecibePaq', 'El teléfono de quien recibe el paquete es necesario').not().isEmpty(),
        check('mailCliente', 'El correo del cliente es necesario').not().isEmpty(),
        check('costoEnvio', 'El costo del envío es necesario').not().isEmpty(),
        validarCampos

    ],
    actualizarPedido);


router.delete('/:id', validarJWT, borrarPedido);

router.get('/:id', validarJWT, getPedidosById);

//Exportar ruta para usarlo en otros 
module.exports = router;