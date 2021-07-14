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

const actualizarBalance = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const balance = await Balance.findById(id);

        if (!balance) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un balance con ese id'
            });
        }

        cambiarBalance = {
            ...req.body,
            usuario: uid
        };

        const balanceActualizado = await Balance.findByIdAndUpdate(id, cambiarBalance, { new: true });

        res.json({
            ok: true,
            balanceActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar balance'
        });
    }

}

const borrarBalance = async(req, res = response) => {

    const id = req.params.id;

    try {

        const balance = await Balance.findById(id);

        if (!balance) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un balance con ese id'
            });
        }

        await Balance.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Balance ' + id + ' borrado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar el balance'
        });
    }

}

module.exports = {
    getBalance,
    crearBalance,
    actualizarBalance,
    borrarBalance
}