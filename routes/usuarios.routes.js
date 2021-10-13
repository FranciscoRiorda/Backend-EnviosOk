/*
Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();
//Definir CRUD de usuarios
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, getUsuariosById, actualizarClave } = require('../controllers/usuarios.controllers');

//Obtener usuario
router.get('/', validarJWT, getUsuarios);

//Crear usuario
router.post('/', [

    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('domicilio', 'El Domicilio es obligatorio').not().isEmpty(),
    check('nacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos

], crearUsuario);

//Actualizar usuario
router.put('/:id', [

        validarJWT,
        validarADMIN_ROLE_o_mismoUsuario,
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
        check('dni', 'El DNI es obligatorio').not().isEmpty(),
        check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('domicilio', 'El Domicilio es obligatorio').not().isEmpty(),
        check('nacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.put('/claves/:id', [validarJWT, validarADMIN_ROLE], actualizarClave);

router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);

router.get('/:uid', validarJWT, getUsuariosById);

//Exportar ruta para usarlo en otros 
module.exports = router;