const { response } = require('express');

const Balance = require('../models/balance.model');


const getBalance = async(req, res = response) => {

    const balance = await Balance.find()
        .populate('usuario', 'nombre apellido email')

    res.json({
        ok: true,
        balance
    });
}

const crearBalance = async(req, res = response) => {

    //Extracción del id del usuario que realiza la operación. 
    const uid = req.uid;

    const balance = new Balance({
        usuario: uid,
        ...req.body
    });

    try {

        const balanceDB = await balance.save();

        res.json({
            ok: true,
            balance: balanceDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear balance'
        });
    }

}

const actualizarBalance = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Balance'
    })
}

const borrarBalance = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Balance'
    })
}

module.exports = {
    getBalance,
    crearBalance,
    actualizarBalance,
    borrarBalance
}