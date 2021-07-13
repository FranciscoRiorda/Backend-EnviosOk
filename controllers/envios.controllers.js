const { response } = require('express');

const Envios = require('../models/envios.model');


const getEnvios = async(req, res = response) => {

    const envios = await Envios.find()
        .populate('usuario', 'nombre apellido email img');

    res.json({
        ok: true,
        envios
    });
}

const crearEnvio = async(req, res = response) => {

    const uid = req.uid;

    const envios = new Envios({
        usuario: uid,
        ...req.body
    });

    try {

        const enviosDB = await envios.save();

        res.json({
            ok: true,
            envios: enviosDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear un envío'
        });
    }

}

const actualizarEnvio = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Envio'
    })
}

const borrarEnvio = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Envio'
    })
}

module.exports = {
    getEnvios,
    crearEnvio,
    actualizarEnvio,
    borrarEnvio
}