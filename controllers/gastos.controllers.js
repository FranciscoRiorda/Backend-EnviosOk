const { response } = require('express');

const Gastos = require('../models/gastos.model');


const getGastos = async(req, res = response) => {

    const gastos = await Gastos.find()
        .populate('usuario', 'nombre apellido email');

    res.json({
        ok: true,
        gastos
    });
}

const crearGasto = async(req, res = response) => {

    const uid = req.uid;

    const gastos = new Gastos({
        usuario: uid,
        ...req.body
    })

    try {

        const gastosDB = await gastos.save();

        res.json({
            ok: true,
            gasto: gastosDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear un gasto'
        });
    }

}

const actualizarGasto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Gasto'
    })
}

const borrarGasto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Gasto'
    })
}

module.exports = {
    getGastos,
    crearGasto,
    actualizarGasto,
    borrarGasto
}