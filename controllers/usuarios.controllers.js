const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, resp) => {

    const desde = Number(req.query.desde) || 0;

    //Promise.all >> ejecuta todas las promesas en su interior. Para que se ejecuten simultaneamente y no tengas pérdidas de tiempo al cargar
    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre apellido dni telefono email domicilio nacimiento password img role')
        .skip(desde)
        .limit(60)
        .populate('usuario', 'nombre apellido email img'),

        Usuario.countDocuments()
    ]);

    resp.json({
        ok: true,
        usuarios,
        total
        // uid: req.uid >>>> de esa manera puedo ver el id del usuario que realizó la petición desde postman
    });

};

const getUsuariosById = async(req, res = response) => {

    const id = req.params.uid;

    try {

        const usuario = await Usuario.findById(id)
            .populate('usuario', 'nombre apellido email img');

        res.json({
            ok: true,
            usuario
        });

    } catch (error) {

        console.log(error);
        res.json({
            ok: true,
            msg: 'Error al encontrar usuario por id'
        });
    }


};


// Crear Usuario
const crearUsuario = async(req, res = response) => {

    const { nombre, apellido, dni, telefono, email, domicilio, nacimiento, password } = req.body;

    try {
        //Email y DNI son campos únicos, por lo que si ya existe uno en la BD se mostrará el siguiente mensaje.
        const existeEmail = await Usuario.findOne({ email });
        const existeDni = await Usuario.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok: false,
                msg: 'El DNI ya se encuentra registrado'
            });

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
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
        });
    }

};


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


        // campos.password = password;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        // await usuarioActualizado.save();

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }

};

const actualizarClave = async(req, res = response) => {

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
        const { password, ...campos } = req.body;

        campos.password = password;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        await usuarioActualizado.save();

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar contraseña'
        });
    }

};

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
    borrarUsuario,
    getUsuariosById,
    actualizarClave
}