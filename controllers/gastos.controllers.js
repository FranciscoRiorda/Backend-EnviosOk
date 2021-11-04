const { response } = require('express');

const Gastos = require('../models/gastos.model');


const getGastos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [gastos, total, sumatoria] = await Promise.all([
        Gastos
        .find({}, 'fecha descripcion importe')
        .skip(desde)
        .limit(10)
        .populate('usuario', 'nombre apellido img')
        .sort({ fecha: 'desc' }),

        Gastos.countDocuments(),
        Gastos.aggregate([{
            $group: {
                _id: '$null',
                Totalimporte: { $sum: '$importe' },

            }
        }]),

    ]);

    res.json({
        ok: true,
        gastos,
        total,
        sumatoria,
    });
};

const getGastos2 = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [gastos, total, sumatoria] = await Promise.all([
        Gastos
        .find({}, 'fecha descripcion importe')
        .skip(desde)
        .populate('usuario', 'nombre apellido img')
        .sort({ fecha: 'desc' }),

        Gastos.countDocuments(),
        Gastos.aggregate([{
            $group: {
                _id: '$null',
                Totalimporte: { $sum: '$importe' },

            }
        }]),

    ]);

    res.json({
        ok: true,
        gastos,
        total,
        sumatoria,
    });
};

const getGastosTotales = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [gastos, total, sumatoria] = await Promise.all([
        Gastos
        .find({}, 'fecha descripcion importe')
        .skip(desde)
        .limit(50)
        .populate('usuario', 'nombre apellido img')
        .sort({ fecha: 'desc' }),

        Gastos.countDocuments(),
        Gastos.aggregate([{
            $group: {
                _id: '$null',
                Totalimporte: { $sum: '$importe' },

            }
        }]),

    ]);

    res.json({
        ok: true,
        gastos,
        total,
        sumatoria,
    });
};


const getGastosPorFecha = async(req, res = response) => {
    const fechaInicial = req.params.fechaInicial; // ejemplo: '2019-03-26'
    const fechaFinal = req.params.fechaFinal;

    Gastos.find({ $and: [{ fecha: { $gte: fechaInicial, $lte: fechaFinal } }] }, 'fecha descripcion importe', (err, gastos) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                error: err.message
            });
        }
        if (!gastos) { // si no se consiguen documentos
            return res.status(400).json({
                message: 'No se ha encontrado gastos en la fecha dada.'
            });
        }
        return res.status(200).json(gastos);
    });
};


const crearGasto = async(req, res = response) => {

    const uid = req.uid;

    const gastos = new Gastos({
        usuario: uid,
        ...req.body
    });

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

};

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

};

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
};




module.exports = {
    getGastos,
    getGastos2,
    crearGasto,
    actualizarGasto,
    borrarGasto,
    getGastosPorFecha,
    getGastosTotales,

};