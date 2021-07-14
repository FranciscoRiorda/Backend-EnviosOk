const { response } = require('express');

const Historico = require('../models/historico.model');


const getHistorico = async(req, res = response) => {

    const historico = await Historico.find()
        .populate('usuario', 'nombre apellido email');

    res.json({
        ok: true,
        historico
    });
}

const crearHistorico = async(req, res = response) => {

    //para que se grabe qué usuario ha creado el nuevo pedido, debemos buscar el uid que ya se encuentra identificado en el token al momento de loguearse
    const uid = req.uid;
    const historico = new Historico({
        usuario: uid,
        ...req.body
    });

    try {

        const historicoDB = await historico.save();

        res.json({
            ok: true,
            historico: historicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear histórico'
        });
    }

}

const actualizarHistorico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const historico = await Historico.findById(id);

        if (!historico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un historico con ese id'
            });
        }

        cambiarHistorico = {
            ...req.body,
            usuario: uid
        };

        const historicoActualizado = await Historico.findByIdAndUpdate(id, cambiarHistorico, { new: true });

        res.json({
            ok: true,
            historicoActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar histórico'
        });
    }

}

const borrarHistorico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const historico = await Historico.findById(id);

        if (!historico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un historico con ese id'
            });
        }

        await Historico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Historico borrado'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar historico'
        });
    }

}

module.exports = {
    getHistorico,
    crearHistorico,
    actualizarHistorico,
    borrarHistorico
}