const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');


const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');

    //Si no hay token se dispara este error
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validación'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //uid del usuario autenticado.
        // console.log(uid);
        req.uid = uid;

        next();

    } catch (error) {
        //Si el token no es correcto se dispara este error
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

};

const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario sin rol administrativo'
            });
        }

        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al validar token en Role'
        });
    }
};

const validarADMIN_ROLE_o_mismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {

            next();

        } else {

            return res.status(403).json({
                ok: false,
                msg: 'Usuario sin rol administrativo'
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al validar token en Role'
        });
    }
};

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUsuario
};