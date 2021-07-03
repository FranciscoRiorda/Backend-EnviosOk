const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, resp) => {

    const usuarios = await Usuario.find({}, 'nombre apellido dni email domicilio nacimiento password');

    resp.json({
        ok: true,
        usuarios
        // uid: req.uid >>>> de esa manera puedo ver el id del usuario que realizó la petición desde postman
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

        //Encrpitar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar el usuario creado. El await hará que el sistema aguarde a ser guardado antes de continuar. Requiere el async en la constante crear usuario.
        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
        })
    }

}



//Actualizar Usuario
const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Actualizaciones
        const { password, email, dni, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email'
                });
            }
        }

        campos.email = email;

        //Si el DNI que estamos ingresando en el campo de datos es diferente al que tenemos cargado. Sigue con la validación si existe en otro usuario.
        if (usuarioDB.dni !== dni) {
            const existeDni = await Usuario.findOne({ dni });
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese DNI'
                });
            }
        }

        campos.dni = dni;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        })
    }

}

//Borrar Usuario
const borrarUsuario = async(req, res, response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

// Exportar los módulos para ser utilizados en los routes
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}