const { response } = require('express');

const Gastos = require('../models/gastos.model');


const getGastos = async(req, res = response) => {

    const gastos = await Gastos.find()
        .populate('usuario', 'nombre apellido email img');

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

const actualizarGasto = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const gasto = await Gastos.findById(id);

        if (!gasto) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encotrado un gsato con ese id'
            });
        }

        cambioGastos = {
            ...req.body,
            usuario: uid
        };

        const gastoActualizado = await Gastos.findByIdAndUpdate(id, cambioGastos, { new: true });

        res.json({
            ok: true,
            gastoActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar gasto'
        });
    }

}

const borrarGasto = async(req, res = response) => {

    const id = req.params.id;

    try {

        const gasto = await Gastos.findById(id);

        if (!gasto) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un gasto con ese id'
            });
        }

        await Gastos.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Gasto borrado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar gasto'
        });
    }

}

module.exports = {
    getGastos,
    crearGasto,
    actualizarGasto,
    borrarGasto
}