const { response } = require('express');

const Pedidos = require('../models/pedidos.model');


const getPedidos = async(req, res = response) => {

    const pedidos = await Pedidos.find()
        .populate('usuario', 'nombre apellido email');

    res.json({
        ok: true,
        pedidos
    });
}


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
            msg: 'Error insesperado al crear usuario'
        });
    }


}

const actualizarPedido = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar pedido'
    })
}

const borrarPedido = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar pedido'
    })
}

module.exports = {
    getPedidos,
    crearPedido,
    actualizarPedido,
    borrarPedido,
}