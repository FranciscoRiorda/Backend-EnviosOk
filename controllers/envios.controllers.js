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

const actualizarEnvio = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;


    try {

        const envio = await Envios.findById(id);

        if (!envio) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado pedido con ese id'
            });
        }

        //Usuario que ha modificado el envío
        const cambiarEnvio = {
            ...req.body,
            usuario: uid
        }

        const envioActualizado = await Envios.findByIdAndUpdate(id, cambiarEnvio, { new: true });

        res.json({
            ok: true,
            envioActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar envío'
        });
    }



}

const borrarEnvio = async(req, res = response) => {

    const id = req.params.id;


    try {

        const envio = await Envios.findById(id);

        if (!envio) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un envío con ese id'
            });
        }

        await Envios.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Envío borrado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar envío'
        });
    }

}

module.exports = {
    getEnvios,
    crearEnvio,
    actualizarEnvio,
    borrarEnvio
}