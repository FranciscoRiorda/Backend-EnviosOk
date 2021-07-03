const jwt = require('jsonwebtoken');


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

}

module.exports = {
    validarJWT,
}