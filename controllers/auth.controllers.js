const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');


//Response: para obtener las ayudas en visual studio
const login = async(req, res = response) => {

    //Extraemos el email y el password del body para lograr el login
    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Los datos o alguno de los datos no son correctos - Email'
            })
        }

        //Verficar constraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Los datos o alguno de los datos no son correctos - Constraseña'
            });
        }

        //Generar el Token -JWT. Si llega el punto de logueo Ok.
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado - login'
        })
    }

}


const renovarToken = async(req, res = response) => {
    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
}



module.exports = {
    login,
    renovarToken
}