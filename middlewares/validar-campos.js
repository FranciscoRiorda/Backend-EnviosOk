const { response } = require('express');
const { validationResult } = require('express-validator');

//Tomar los errores de validacion de campos programados en usuarios.routes. 'Check'
//next hace que continúe la siguiente validación una vez aprobada la primera.
const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampos
}