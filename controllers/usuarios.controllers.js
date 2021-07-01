const { response } = require('express');

const Usuario = require('../models/usuario.model');



const getUsuarios = async(req, resp) => {

    const usuarios = await Usuario.find({}, 'nombre apellido dni email domicilio nacimiento password');

    resp.json({
        ok: true,
        usuarios
    });

}


// Crear Usuario
const crearUsuario = async(req, res = response) => {

    const { nombre, apellido, dni, email, domicilio, nacimiento, password } = req.body;

    try {
        //Email y DNI son campos únicos, por lo que si ya existe uno en la BD se mostrará el siguiente mensaje.
        const existeEmail = await Usuario.findOne({ email });
        const existeDni = await Usuario.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok: false,
                msg: 'El DNI ya se encuentra registrado'
            })

        }

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Guardar el usuario creado. El await hará que el sistema aguarde a ser guardado antes de continuar. Requiere el async en la constante crear usuario.
        await usuario.save();

        res.json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
        })
    }

}

// Exportar los módulos para ser utilizados en los routes
module.exports = {
    getUsuarios,
    crearUsuario,
}