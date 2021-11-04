const { response } = require('express');

const Pedidos = require('../models/pedidos.model');


const getPedidos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [pedidos, total] = await Promise.all([
        Pedidos
        .find({}, 'nombreCliente mailCliente diaRetiro domicilioRetiro telEntregaPaq estadoRetiro diaEntrega domicilioEntrega telRecibePaq estadoEntrega costoEnvio observaciones')
        .skip(desde)
        .limit(10)
        .populate('usuario', 'nombre apellido email img')
        .sort({ diaRetiro: 'desc' }),

        Pedidos.countDocuments()
    ]);

    res.json({
        ok: true,
        pedidos,
        total
    });
};

const getPedidos2 = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [pedidos, total] = await Promise.all([
        Pedidos
        .find({}, 'nombreCliente mailCliente diaRetiro domicilioRetiro telEntregaPaq estadoRetiro diaEntrega domicilioEntrega telRecibePaq estadoEntrega costoEnvio observaciones')
        .skip(desde)
        .populate('usuario', 'nombre apellido email img')
        .sort({ diaRetiro: 'desc' }),

        Pedidos.countDocuments()
    ]);

    res.json({
        ok: true,
        pedidos,
        total
    });
};

const getPedidosById = async(req, res = response) => {

    const id = req.params.id;

    try {

        const pedido = await Pedidos.findById(id)
            .populate('usuario', 'nombre apellido email img');

        res.json({
            ok: true,
            pedido
        });

    } catch (error) {

        console.log(error);
        res.json({
            ok: true,
            msg: 'Error al encontrar pedido por id'
        });
    }
};

const getPedidosPorFecha = async(req, res = response) => {
    const fechaInicial = req.params.fechaInicial; // ejemplo: '2019-03-26'
    const fechaFinal = req.params.fechaFinal;

    Pedidos.find({ $and: [{ diaRetiro: { $gte: fechaInicial, $lte: fechaFinal } }] }, 'nombreCliente mailCliente diaRetiro domicilioRetiro telEntregaPaq estadoRetiro diaEntrega domicilioEntrega telRecibePaq estadoEntrega costoEnvio observaciones', (err, pedidos) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    error: err.message
                });
            }
            if (!pedidos) { // si no se consiguen documentos
                return res.status(400).json({
                    message: 'No se ha encontrado pedidos en la fecha dada.'
                });
            }
            return res.status(200).json(pedidos);
        })
        .sort({ diaRetiro: 'desc' });
};

const getPedidosPorEstadoRetiro = async(req, res = response) => {
    const estadoRetiro = req.params.estadoRetiro; // ejemplo: '2019-03-26'

    Pedidos.find({ $and: [{ estadoRetiro: { $eq: estadoRetiro } }] }, 'nombreCliente mailCliente diaRetiro domicilioRetiro telEntregaPaq estadoRetiro diaEntrega domicilioEntrega telRecibePaq estadoEntrega costoEnvio observaciones', (err, pedidos) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    error: err.message
                });
            }
            if (!pedidos) { // si no se consiguen documentos
                return res.status(400).json({
                    message: 'No se ha encontrado pedidos en el estado asignado.'
                });
            }
            return res.status(200).json(pedidos);
        })
        .sort({ diaRetiro: 'desc' })
        .limit(50);
};


const getPedidosPorEstadoEntrega = async(req, res = response) => {
    const estadoEntrega = req.params.estadoEntrega; // ejemplo: '2019-03-26'

    Pedidos.find({ $and: [{ estadoEntrega: { $eq: estadoEntrega } }] }, 'nombreCliente mailCliente diaRetiro domicilioRetiro telEntregaPaq estadoRetiro diaEntrega domicilioEntrega telRecibePaq estadoEntrega costoEnvio observaciones', (err, pedidos) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    error: err.message
                });
            }
            if (!pedidos) { // si no se consiguen documentos
                return res.status(400).json({
                    message: 'No se ha encontrado pedidos en el estado asignado.'
                });
            }
            return res.status(200).json(pedidos);
        })
        .sort({ diaRetiro: 'desc' })
        .limit(50);
};

//Petición asincrona 'async'
const crearPedido = async(req, res = response) => {

    //para que se grabe qué usuario ha creado el nuevo pedido, debemos buscar el uid que ya se encuentra identificado en el token al momento de loguearse
    const uid = req.uid;
    const pedido = new Pedidos({
        usuario: uid,
        ...req.body
    });

    try {

        const pedidosDB = await pedido.save();

        res.json({
            ok: true,
            pedido: pedidosDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insesperado al crear pedido'
        });
    }
};


const actualizarPedido = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const pedidos = await Pedidos.findById(id);

        if (!pedidos) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado por id'
            });
        }

        const cambiosPedidos = {
            ...req.body,
            usuario: uid
        };
        //{new:true} >>> muestra los datos mas actualizados
        const pedidosActualizados = await Pedidos.findByIdAndUpdate(id, cambiosPedidos, { new: true });

        res.json({
            ok: true,
            pedidosActualizados
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar pedido'
        });
    }
};

const borrarPedido = async(req, res = response) => {

    const id = req.params.id;

    try {

        const pedidos = await Pedidos.findById(id);

        if (!pedidos) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un pedido con ese id'
            });
        }

        await Pedidos.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Pedido elminado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar Pedido'
        });
    }
};


module.exports = {
    getPedidos,
    getPedidos2,
    crearPedido,
    actualizarPedido,
    borrarPedido,
    getPedidosById,
    getPedidosPorFecha,
    getPedidosPorEstadoRetiro,
    getPedidosPorEstadoEntrega
};