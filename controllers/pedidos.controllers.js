const { response } = require('express');

const Pedidos = require('../models/pedidos.model');


const getPedidos = async(req, res = response) => {

    const pedidos = await Pedidos.find()
        .populate('usuario', 'nombre apellido email img');

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
            }
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

}

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
            msg: 'Error inesperado al borrar pedido'
        });
    }

}

module.exports = {
    getPedidos,
    crearPedido,
    actualizarPedido,
    borrarPedido,
}