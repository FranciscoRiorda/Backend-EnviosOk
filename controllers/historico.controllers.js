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

const actualizarHistorico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Historico'
    })
}

const borrarHistorico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Historico'
    })
}

module.exports = {
    getHistorico,
    crearHistorico,
    actualizarHistorico,
    borrarHistorico
}