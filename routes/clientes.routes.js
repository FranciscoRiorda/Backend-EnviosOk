const { Router } = require('express');
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getClientes, crearCliente, actualizarCliente, borrarCliente, getClientesById } = require("../controllers/clientes.controllers");


const router = Router();

//Obterner Clientes
router.get('/', validarJWT, getClientes);

//Crear Cliente
router.post('/', [

    check('nombre', 'El nombre del cliente es necesario').not().isEmpty(),
    check('dni', 'El DNI del cliente es necesario').not().isEmpty(),
    check('telefono', 'El teléfono de cliente es necesario').not().isEmpty(),
    check('email', 'El correo del cliente es necesario').not().isEmpty(),
    check('domicilio', 'El domicilio del cliente es necesario').not().isEmpty(),
    validarCampos

], crearCliente);

//Actualizar Cliente
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del cliente es necesario').not().isEmpty(),
    check('dni', 'El DNI del cliente es necesario').not().isEmpty(),
    check('telefono', 'El teléfono de cliente es necesario').not().isEmpty(),
    check('email', 'El correo del cliente es necesario').not().isEmpty(),
    check('domicilio', 'El domicilio del cliente es necesario').not().isEmpty(),
    validarCampos

], actualizarCliente);

//Eliminar Clientes
router.delete('/:id', validarJWT, borrarCliente);

//Buscar Clientes por id
router.get('/:id', validarJWT, getClientesById);



//Exportar ruta para usarlo en otros 
module.exports = router;