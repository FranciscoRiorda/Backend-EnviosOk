const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
                msg: 'Los datos o alguno de los datos no son correctos'
            });
        }

        //Verficar constraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        // const validPass = await Usuario.findOne({ password });

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Los datos o alguno de los datos no son correctos'
            });
        }

        // if (!validPass) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Los datos o alguno de los datos no son correctos - clave'
        //     });
        // }

        //Generar el Token -JWT. Si llega el punto de logueo Ok.
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado - login'
        });
    }

}


const renovarToken = async(req, res = response) => {
    const uid = req.uid;

    //Geerar el token
    const token = await generarJWT(uid);

    //Obtener el usuario por uid al renovar el token
    const usuario = await Usuario.findById(uid);





    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    });
}



module.exports = {
    login,
    renovarToken
}