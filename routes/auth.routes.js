/* 
    Path: '/api/login'
*/

const { Router } = require('express');
const { login, renovarToken } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/', [

    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().notEmpty(),
    validarCampos
], login)

router.get('/renovar',
    validarJWT,
    renovarToken
)



module.exports = router;